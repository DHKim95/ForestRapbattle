import numpy as np
from jamo import h2j, j2hcj
import asr_metrics as metrics
import Levenshtein as Lev
from .bin import inference


########################################

def wer(ref, hyp ,debug=False):
    r = ref.split()
    h = hyp.split()
    #costs will holds the costs, like in the Levenshtein distance algorithm
    costs = [[0 for inner in range(len(h)+1)] for outer in range(len(r)+1)]
    # backtrace will hold the operations we've done.
    # so we could later backtrace, like the WER algorithm requires us to.
    backtrace = [[0 for inner in range(len(h)+1)] for outer in range(len(r)+1)]

    OP_OK = 0
    OP_SUB = 1
    OP_INS = 2
    OP_DEL = 3

    DEL_PENALTY=1 # Tact
    INS_PENALTY=1 # Tact
    SUB_PENALTY=1 # Tact
    # First column represents the case where we achieve zero
    # hypothesis words by deleting all reference words.
    for i in range(1, len(r)+1):
        costs[i][0] = DEL_PENALTY*i
        backtrace[i][0] = OP_DEL

    # First row represents the case where we achieve the hypothesis
    # by inserting all hypothesis words into a zero-length reference.
    for j in range(1, len(h) + 1):
        costs[0][j] = INS_PENALTY * j
        backtrace[0][j] = OP_INS

    # computation
    for i in range(1, len(r)+1):
        for j in range(1, len(h)+1):
            if r[i-1] == h[j-1]:
                costs[i][j] = costs[i-1][j-1]
                backtrace[i][j] = OP_OK
            else:
                substitutionCost = costs[i-1][j-1] + SUB_PENALTY # penalty is always 1
                insertionCost    = costs[i][j-1] + INS_PENALTY   # penalty is always 1
                deletionCost     = costs[i-1][j] + DEL_PENALTY   # penalty is always 1

                costs[i][j] = min(substitutionCost, insertionCost, deletionCost)
                if costs[i][j] == substitutionCost:
                    backtrace[i][j] = OP_SUB
                elif costs[i][j] == insertionCost:
                    backtrace[i][j] = OP_INS
                else:
                    backtrace[i][j] = OP_DEL

    # back trace though the best route:
    i = len(r)
    j = len(h)
    numSub = 0
    numDel = 0
    numIns = 0
    numCor = 0
    if debug:
        print("OP\tREF\tHYP")
        lines = []
    while i > 0 or j > 0:
        if backtrace[i][j] == OP_OK:
            numCor += 1
            i-=1
            j-=1
            if debug:
                lines.append("OK\t" + r[i]+"\t"+h[j])
        elif backtrace[i][j] == OP_SUB:
            numSub +=1
            i-=1
            j-=1
            if debug:
                lines.append("SUB\t" + r[i]+"\t"+h[j])
        elif backtrace[i][j] == OP_INS:
            numIns += 1
            j-=1
            if debug:
                lines.append("INS\t" + "****" + "\t" + h[j])
        elif backtrace[i][j] == OP_DEL:
            numDel += 1
            i-=1
            if debug:
                lines.append("DEL\t" + r[i]+"\t"+"****")
    if debug:
        lines = reversed(lines)
        for line in lines:
            print(line)
        print("Ncor " + str(numCor))
        print("Nsub " + str(numSub))
        print("Ndel " + str(numDel))
        print("Nins " + str(numIns))
    return numCor, numSub, numDel, numIns, (numSub + numDel + numIns) / (float) (len(r))
    

def cer(ref, hyp):
    ref = ref.replace(' ', '')
    hyp = hyp.replace(' ', '')
    dist = Lev.distance(hyp, ref)
    length = len(ref)
    return dist, length, dist/length
#########################################3

# def STT():
input_text = inference.main()
print('STT.py, 정답 단어는 db에서 가져와야 한다!!!!!!!!')
text = '기체크로마토질량분석법' # db에서 가져와야 한다

[cer1, substitutions, deletions, insertions] = metrics.get_cer(text, input_text)
[wer1, substitutions, deletions, insertions] = metrics.get_wer(text, input_text)

ans = 1 -cer1
if ans >= 0.8:
    print(True)
else:
    print(False)


##########################################################################


# text = ''.join(list(text.split()))
# input_text = ''.join(list(input_text.split()))

# tmp = list(j2hcj(h2j(input_text)))
# tmp1 = list(j2hcj(h2j(input_text1)))
# tmp2 = list(j2hcj(h2j(input_text2)))
# tmp3 = list(j2hcj(h2j(input_text3)))
# ans = list(j2hcj(h2j(text)))
# cnt = 0

# tmp_text = []
# for i in range(len(text)):
#     tmp_text.append(list(j2hcj(h2j(text[i]))))
#     a = list(j2hcj(h2j(text[i])))
# print(tmp_text, len(tmp_text))
# tmp_input = []
# for j in range(len(input_text)):
#     if input_text[j] != '.':
#         tmp_input.append(list(j2hcj(h2j(input_text[j]))))
#         b = list(j2hcj(h2j(input_text[j])))
#         # print('b값: ', b)
# print('b값: ', tmp_input, len(tmp_input))
            
# origin =
# tmp_input = 

# print(origin)
# print(tmp_input)

# print(ans)
# print(len(ans))
# print(tmp)
# 입력된 음성의 길이와 정답의 길이가 같을 때
# if len(ans) == len(tmp):
#     for idx in range(len(tmp)):
#         if ans[idx] == tmp[idx]:
#             cnt += 1
# # 입력된 음성의 길이보다 정답의 길이가 길 때
# elif len(ans) > len(tmp):
#     for idx in range(len(tmp)):
#         if ans[idx] == tmp[idx]:
#             cnt += 1
# # 입력된 음성의 길이보다 정답의 길이가 짧을 때 - 1. 길이가 길어도 맞게 해준다 
# elif len(ans) < len(tmp):
#     pass


# print(cnt)

# similarity = round((cnt / len(ans)), 2)
# print(similarity)

# if similarity >= 0.9:
#     print(True)
# else:
#     print(False)

# 문제점:
# 1. 중간에 받침을 이상하게 발음하면 뒤에가 다 밀리거나 당겨져서 인덱스가 다 엉망이 된다. 



# chosung_list = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
# jungsung_list = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ']
# jongsung_list = [' ', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']

