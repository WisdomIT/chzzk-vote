"use client";

import {
  Container,
  ContainerCenter,
  PageTitle,
  Title,
  UnorderedList,
  OrderedList,
  Text,
} from "../_components/index.styled";

export default function Page() {
  return (
    <Container>
      <PageTitle>CHZZK VOTE (치지직 투표 추첨기) 개인정보 처리방침</PageTitle>
      <ContainerCenter>
        <Text>
          CHZZK VOTE는 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및
          관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게
          관리하고 있습니다. 이에 「개인정보 보호법」 제30조에 따라 정보주체에게
          개인정보 처리에 관한 절차 및 기준을 안내하고, 이와 관련한 고충을
          신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보
          처리방침을 수립 · 공개합니다.
        </Text>
        <Title>1. 개인정보의 처리 목적</Title>
        <Text>
          CHZZK VOTE는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
          개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이
          변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는
          등 필요한 조치를 이행할 예정입니다.
        </Text>
        <OrderedList>
          <li>
            <Text>서비스 이용 현황 분석</Text>
            <UnorderedList>
              <li>서비스 이용 통계 수집 및 분석</li>
              <li>서비스 개선을 위한 이용패턴 분석</li>
            </UnorderedList>
          </li>
          <li>
            <Text>모니터링을 위한 서비스 알림</Text>
            <UnorderedList>
              <li>투표 및 추첨 진행 상태 알림</li>
            </UnorderedList>
          </li>
        </OrderedList>
        <Title>2. 처리하는 개인정보의 항목</Title>
        <Text>CHZZK VOTE는 다음의 개인정보 항목을 처리하고 있습니다.</Text>
        <OrderedList>
          <li>
            <Text>자동 수집 항목 (Google Analytics)</Text>
            <UnorderedList>
              <li>라이브 스트리밍 진행자의 채널명</li>
              <li>서비스 이용 기록</li>
              <li>IP 주소</li>
            </UnorderedList>
          </li>
          <li>
            <Text>서비스 알림용 수집 항목 (Discord Webhook)</Text>
            <UnorderedList>
              <li>라이브 스트리밍 진행자의 채널명</li>
              <li>라이브 스트리밍 진행자의 ID</li>
              <li>추첨/투표 진행 시점</li>
            </UnorderedList>
          </li>
        </OrderedList>
        <Title>3. 개인정보의 처리 및 보유 기간</Title>
        <Text>
          CHZZK VOTE는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터
          개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를
          처리·보유합니다.
        </Text>
        <UnorderedList>
          <li>Google Analytics 데이터: 수집일로부터 26개월</li>
          <li>Discord Webhook 데이터: 수집일로부터 6개월</li>
        </UnorderedList>
        <Title>4. 개인정보의 파기 절차 및 방법</Title>
        <Text>
          CHZZK VOTE는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가
          불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
        </Text>
        <OrderedList>
          <li>
            <Text>파기절차</Text>
            <UnorderedList>
              <li>
                파기 사유가 발생한 개인정보를 선정하고, 개인정보 보호책임자의
                승인을 받아 파기합니다.
              </li>
            </UnorderedList>
          </li>
          <li>
            <Text>파기방법</Text>
            <UnorderedList>
              <li>
                전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수
                없도록 파기합니다.
              </li>
            </UnorderedList>
          </li>
        </OrderedList>
        <Title>5. 개인정보의 안전성 확보조치</Title>
        <Text>
          CHZZK VOTE는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
          있습니다.
        </Text>
        <OrderedList>
          <li>
            <Text>관리적 조치</Text>
            <UnorderedList>
              <li>내부관리계획 수립 및 시행</li>
              <li>수집하는 개인정보의 최소화</li>
            </UnorderedList>
          </li>
          <li>
            <Text>기술적 조치</Text>
            <UnorderedList>
              <li>Google Analytics의 데이터 보호 정책 준수</li>
              <li>Discord Webhook의 보안 설정 적용</li>
              <li>HTTPS 암호화 통신 사용</li>
            </UnorderedList>
          </li>
        </OrderedList>
        <Title>
          6. 개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항
        </Title>
        <Text>
          CHZZK VOTE는 Google Analytics 및 Discord Webhook을 통해 이용통계
          정보를 수집·분석하고 있습니다.
        </Text>
        <Text>
          이용자는 Google Analytics가 제공하는 브라우저 플러그인을 통해 수집을
          거부할 수 있습니다.
        </Text>
        <UnorderedList>
          <li>
            Google Analytics 차단 브라우저 플러그인:
            https://tools.google.com/dlpage/gaoptout
          </li>
        </UnorderedList>
        <Text>
          Discord Webhook을 통한 수집 데이터의 파기를 원하신다면, 환경설정 -
          패치노트 - 개발자에게 건의하기를 통해 데이터 파기를 요청하시기
          바랍니다.
        </Text>
        <Title>7. 개인정보 보호책임자</Title>
        <Text>
          CHZZK VOTE는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
          처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이
          개인정보 보호책임자를 지정하고 있습니다.
        </Text>
        <UnorderedList>
          <li>직책: 개인정보 보호책임자</li>
          <li>연락처: bs03166@naver.com</li>
          <li>디스코드: wisdomit</li>
        </UnorderedList>
        <Title>8. 정보주체의 권익침해에 대한 구제방법</Title>
        <Text>
          정보주체는 개인정보침해로 인한 구제를 받기 위하여
          개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에
          분쟁해결이나 상담 등을 신청할 수 있습니다.
        </Text>
        <UnorderedList>
          <li>개인정보 분쟁조정위원회: 1833-6972 (www.kopico.go.kr)</li>
          <li>개인정보침해신고센터: 118 (privacy.kisa.or.kr)</li>
          <li>대검찰청: 1301 (www.spo.go.kr)</li>
          <li>경찰청: 182 (ecrm.cyber.go.kr)</li>
        </UnorderedList>
        <Title>9. 개인정보 처리방침의 변경</Title>
        <Text>이 개인정보 처리방침은 2024년 12월 25일부터 적용됩니다.</Text>
      </ContainerCenter>
    </Container>
  );
}
