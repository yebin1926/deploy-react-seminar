# 12기 GitHub 협업 가이드라인(세미나 진행)

## 목적

1. 원활한 세미나 준비 및 진행, 충돌 최소화 및 브랜치 효율적 관리
2. 세미나 진행시 간단하게나마 GitHub의 여러 기능을 사용해보는 경험

## 방식

### 브랜치 구성

**수업과 과제에서 중점적으로 활용할 코드**

`**origin/main**` : 우리의 최신 세미나에서 사용될 코드입니다. remote 레포지토리 상에 위치해있으며, 이 코드를 본인 이름 브랜치로 병합하여 세미나 수강시 코드를 작성합니다. 

`**본인 이름**` ex) `**junyoung**` : 자신이 수업 시간에 작성한 코드 + 과제한 내용을 기록하기 위한 브랜치입니다. 

`**본인 이름-week#-hw**` ex) `**junyoung-week4-hw**` : 자신이 수업 시간에 `**본인 이름**` 에서 작성한 코드를 바탕으로 과제를 제출할 때 사용할 브랜치입니다.

---

**main과 관련 없는 브랜치**

`브랜치명` ex) `react-hook-practice`

`브랜치명-본인 이름` ex) `react-hook-practice-junyoung` : 추가적으로 사용하는 브랜치 또한 자신의 이름을 붙여서 새로운 브랜치를 만들어서 거기서 실습합니다. 

---

**매주 과제 해답 및 해당 주차까지의 코드를 기록**

`week#-solution` : 해당 주차에서 진행한 세미나 + 과제 해답까지 반영된 코드입니다. 다음 주차 수업 직전에 제공될 예정입니다. 

**작업 플로우**

1. **해당 레포지토리를 사용하는 첫 주차에는 main 브랜치에서**

```jsx
git checkout -b junyoung(본인 이름)
```

명령어를 입력합니다. 

1. **이후 주차에서는 세미나 시작할 때** 

```jsx
git checkout junyoung(본인 이름) <- 현재 브랜치가 junyoung(본인 이름) 브랜치이면 입력할 필요 없습니다. 

git fetch origin <- remote 레포지토리에 존재하는 브랜치들에 대한 정보를 가져오는 역할을 합니다. 

1. 나는 혹시나 발생할 수 있는 merge conflict를 해결할 줄 안다면
git merge origin/main

2. 내가 한 과제가 잘 작동하고 이후에 문제가 없을 것 같다면
git merge -Xours origin/main

3. 내가 과제를 작성하다가 도중에 완성하지 못하고 commit을 쌓았거나, 내가 작성한 과제가 완벽한지 확신이 없다면
git merge -Xtheirs origin/main

<- remote 레포지토리에 존재하는 main 브랜치의 코드를 junyoung(본인 이름) 브랜치에 가져오는 역할을 합니다. 
```

명령어를 입력 후 세미나에 참여합니다. 

**참고)**

<aside>
👈 `git merge -Xours origin/main` : origin/main 브랜치에 존재하는 코드와 junyoung 브랜치에 존재하는 코드에 다른 부분이 있을 경우, junyoung 브랜치의 코드를 해당 부분에 반영하는 것입니다.

</aside>

<aside>
👉 `git merge -Xtheirs origin/main` : origin/main 브랜치에 존재하는 코드와 junyoung 브랜치에 존재하는 코드에 다른 부분이 있을 경우, origin/main 브랜치의 코드를 해당 부분에 반영하는 것입니다.

</aside>

1. **세미나가 끝난 이후 과제 작성 이전** 

junyoung(본인 이름) 브랜치에서 세미나에서 진행한 코드를 모두 반영하고 나서

```jsx
git add .

git commit -m "Feat: add week# seminar code" (예시입니다)
```

커맨드를 입력하여 본인이 세미나에서 작성한 내용을 기록합니다. 

1. **이후 과제를 위해** 

```jsx
git checkout -b junyoung(본인 이름)-week#-hw
```

명령어를 입력하여 새로운 브랜치를 만들고 과제를 진행합니다. 

이 때 git checkout 명령어는 반드시!!! junyoung(본인 이름) 브랜치에서 입력해야 합니다. 본인이 수업 시간에 작성한 세미나 자료에 이어서 과제를 진행해야 하기 때문입니다!

1. **과제를 모두 완성한 후**

```jsx
git add .

git commit -m "Feat: add week# seminar homework code" (예시입니다)

git push origin HEAD
```

명령어를 입력하여 원격 레포지토리에 `junyoung(본인 이름)-week#-hw` 브랜치를 생성합니다. 

 

1. **과제 완료 후 PR 작성하기**

이후 `junyoung(본인 이름)-week#-hw` 브랜치를 `junyoung(본인 이름)` 로 합치는 Pull Request를 작성합니다. PR 가이드라인은 아래에..

**협업 가이드라인**

- 커밋은 한 주차의 세미나 작성시 한개, 과제 작성시 한개 작성하는 것을 기본으로 하되, 본인이 세미나를 진행하거나 과제를 하면서 중간 중간, 세이브하고 싶은 지점이 있다면 커밋을 작성해도 괜찮습니다.
- 이 때 커밋은 연관된 코드를 하나의 묶음으로 하는 것을 권장합니다. 커밋 메시지는 1주차에서 배운 내용을 기반으로 작성합니다.

<aside>
👍 django에서 model 작성 후 커밋, serializer 작성 후 커밋, view 작성 후 커밋

</aside>

<aside>
👎 과제 하다가 오늘 작성한 내용 커밋, 다음날 작성한 내용 커밋

</aside>

**커밋 메시지 예시**

```jsx
git commit -m "Fix: ~~~"
----------------------------
git commit -m "Feat: ~~~"
----------------------------
git commit -m "Refactor: ~~~"
```

**PR 생성**

1. PR 제목은 “[week#][본인 이름(한글)] 과제 제출”
2. PR reviewer → 본인의 리뷰 담당 운영진, assignee → 자신
3. base: `junyoung`(본인 이름) , compare: `junyoung-week#-hw`
4. PR comment에 작업한 내용 간략하게 정리해서 설명해두기. 또는 리뷰어에게 질문하고 싶은 내용 적기. 해당 주차의 과제가 어떤 것인지는 운영진과 12기 아기 사자 모두 알고 있으므로, 12기 아기사자들이 나중에 복습을 할 때 다시 해당 PR을 보면서 내용을 상기하기 위한 목적이 가장 큽니다. 

**PR 리뷰 후**

1. 리뷰 담당 운영진에게 리뷰를 받은 뒤 혹시나 수정할 사항이 있다면, PR에 적힌 리뷰를 바탕으로 코드를 수정한 뒤, [5. 과제를 모두 완성한 후](https://www.notion.so/12-GitHub-e3df666ed0f440bfa91fbc49c5cccc5c?pvs=21) 를 다시 진행 해주시면 됩니다.
2. 리뷰 반영까지 모두 마치면, 아기사자는 본인이 직접 PR을 remote `junyoung(본인 이름)` 브랜치에 merge하면 됩니다. 
3. Merge를 마치면 로컬의 `junyoung-week#-hw` 에서 작성한 코드가 remote `junyoung(본인 이름)` 브랜치에 병합되며, 우리 레포지토리에서는 원격의 `junyoung-week#-hw` 는 자동으로 삭제됩니다. 이는 레포지토리 내 불필요한 브랜치를 남겨두지 않기 위함입니다.
