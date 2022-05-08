using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;
using UnityEngine.UI;
using System.Linq;
using FrostweepGames.Plugins.Native;
using TMPro;

using UnityEngine.Networking;


public class MicTest : MonoBehaviour
{
    private AudioClip _workingClip;

    public TMP_Text permissionStatusText;

    public TMP_Text recordingStatusText;

    public TMP_Text sendToDjangoStatusText;

    public TMP_Dropdown devicesDropdown;

    public AudioSource audioSource;

    public Button startRecordButton,
                  stopRecordButton,
                  playRecordedAudioButton,
                  requestPermissionButton,
                  refreshDevicesButton,
                  sendToDjangoButton;

    public List<AudioClip> recordedClips;

    public int frequency = 44100;

    public int recordingTime = 120;

    public string selectedDevice;

    public bool makeCopy = false;

    public float averageVoiceLevel = 0f;

    public double voiceDetectionTreshold = 0.02d;

    public bool voiceDetectionEnabled = false;

    byte[] data = null;

    private void Start()
    {
        audioSource = GetComponent<AudioSource>();

        startRecordButton.onClick.AddListener(StartRecord);
        stopRecordButton.onClick.AddListener(StopRecord);
        playRecordedAudioButton.onClick.AddListener(PlayRecordedAudio);
        requestPermissionButton.onClick.AddListener(RequestPermission);
        refreshDevicesButton.onClick.AddListener(RefreshMicrophoneDevicesButtonOnclickHandler);
        sendToDjangoButton.onClick.AddListener(SendAudioClip);

        devicesDropdown.onValueChanged.AddListener(DevicesDropdownValueChangedHandler);

        selectedDevice = string.Empty;
        CustomMicrophone.RefreshMicrophoneDevices();

        CustomMicrophone.RecordStreamDataEvent += RecordStreamDataEventHandler;
        CustomMicrophone.PermissionStateChangedEvent += PermissionStateChangedEventHandler;
        CustomMicrophone.RecordStartedEvent += RecordStartedEventHandler;
        CustomMicrophone.RecordEndedEvent += RecordEndedEventHandler;
    }

    private void OnDestroy()
    {
        CustomMicrophone.RecordStreamDataEvent -= RecordStreamDataEventHandler;
        CustomMicrophone.PermissionStateChangedEvent -= PermissionStateChangedEventHandler;
        CustomMicrophone.RecordStartedEvent -= RecordStartedEventHandler;
        CustomMicrophone.RecordEndedEvent -= RecordEndedEventHandler;
    }

    private void Update()
    {
        permissionStatusText.text = $"Microphone permission: {selectedDevice} for '{ (CustomMicrophone.HasMicrophonePermission() ? "<color=green>granted</color>" : "<color=red>denined</color>") }'";

        if (CustomMicrophone.HasConnectedMicrophoneDevices())
        {
            bool recording = CustomMicrophone.IsRecording(selectedDevice);

            recordingStatusText.text = $"Microphone status: {(recording ? "<color=green>recording</color>" : "<color=yellow>idle</color>")}";

            if (voiceDetectionEnabled && recording)
            {
                recordingStatusText.text += $"\nVoice Detected: { CustomMicrophone.IsVoiceDetected(selectedDevice, _workingClip, ref averageVoiceLevel, voiceDetectionTreshold) }";
            }
        }
    }

    /// <summary>
    /// Works only in WebGL
    /// </summary>
    /// <param name="samples"></param>
    private void RecordStreamDataEventHandler(float[] samples)
    {
        // handle streaming recording data
    }

    /// <summary>
    /// Works only in WebGL
    /// </summary>
    /// <param name="permissionGranted"></param>
    private void PermissionStateChangedEventHandler(bool permissionGranted)
    {
        // handle current permission status

        Debug.Log($"Permission state changed on: {permissionGranted}");
    }

    private void RecordEndedEventHandler()
    {
        // handle record ended event

        Debug.Log("Record ended");
    }

    private void RecordStartedEventHandler()
    {
        // handle record started event

        Debug.Log("Record started");
    }

    private void RefreshMicrophoneDevicesButtonOnclickHandler()
    {
        CustomMicrophone.RefreshMicrophoneDevices();

        if (!CustomMicrophone.HasConnectedMicrophoneDevices())
            return;

        devicesDropdown.ClearOptions();
        devicesDropdown.AddOptions(CustomMicrophone.devices.ToList());
        DevicesDropdownValueChangedHandler(0);
    }

    private void RequestPermission()
    {
        CustomMicrophone.RequestMicrophonePermission();
        CustomMicrophone.RefreshMicrophoneDevices();

        if (!CustomMicrophone.HasConnectedMicrophoneDevices())
            return;

        devicesDropdown.ClearOptions();
        devicesDropdown.AddOptions(CustomMicrophone.devices.ToList());
        DevicesDropdownValueChangedHandler(0);
    }

    private void StartRecord()
    {
        if (!CustomMicrophone.HasConnectedMicrophoneDevices())
        {
            Debug.Log("No connected devices found. Refreshing...");
            CustomMicrophone.RefreshMicrophoneDevices();
            return;
        }

        _workingClip = CustomMicrophone.Start(selectedDevice, false, recordingTime, frequency);
    }

    private void StopRecord()
    {
        if (!CustomMicrophone.IsRecording(selectedDevice))
            return;

        // End recording is an async operation, so you have to provide callback or subscribe on RecordEndedEvent event
        CustomMicrophone.End(selectedDevice, () =>
        {
            if (makeCopy)
            {
                recordedClips.Add(CustomMicrophone.MakeCopy($"copy{recordedClips.Count}", recordingTime, frequency, _workingClip));
                audioSource.clip = recordedClips.Last();
            }
            else
            {
                audioSource.clip = _workingClip;
            }

            //Debug.Log(SaveWavFile());
            //Debug.Log(data);
            //audioSource.Play();
        });
    }

    public string SaveWavFile()
    {
        string filepath;
        data = WavUtility.FromAudioClip(_workingClip, out filepath, true);
        return filepath;
    }

    private void SendAudioClip()
    {
        StartCoroutine(Send());
    }

    IEnumerator Send()
    {
        byte[] audioByte = File.ReadAllBytes(SaveWavFile());
        Debug.Log(audioByte.Length);

        WWWForm form = new WWWForm();
        form.AddBinaryData("file", audioByte, "test.wav");

        using (UnityWebRequest www = UnityWebRequest.Post("http://127.0.0.1:8000/api/v1/game/AI", form))
        {
            yield return www.SendWebRequest();
            if (www.result != UnityWebRequest.Result.Success)
            {
                sendToDjangoStatusText.text = www.error;
                Debug.Log(www.error);
            }
            else
            {
                Debug.Log("Post Data Complete!");
                sendToDjangoStatusText.text = "Á¡¼ö: " + www.downloadHandler.text;
            }
        }
    }

    private void PlayRecordedAudio()
    {
        if (_workingClip == null)
            return;

        audioSource.clip = _workingClip;
        audioSource.Play();
    }

    private void DevicesDropdownValueChangedHandler(int index)
    {
        if (index < CustomMicrophone.devices.Length)
        {
            selectedDevice = CustomMicrophone.devices[index];
        }
    }
}
