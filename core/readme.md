## 비즈니스 요구 사항

회원
- 회원 가입 & 조회 O
- 회원은 일반 / VIP 등급
- 회원 데이터는 자체 DB 구축 O, 외부 시스템 연동 가능

주문과 할인 정책
- 회원은 상품 주문 가능
- 회원 등급에 따라 할인 정책 적용 가능
- 할인 정책은 모든 VIP -> 1000원 할인 (나중에 변경 가능)
- 할인 정책 변경 가능성 높음 / 회사의 기본 할인 정책을 아직 X

---

### 좋은 객체 지향 설계 5가지 원칙 중 `SRP, DIP, OCP` 적용
1. SRP 단일 책임 원칙 - 한 클래스는 하나의 책임만 가져야 한다
- 구현 객체를 생성하고 여결하는 책임은 AppConfig가 담당
- 클라이언트 객체는 실행하는 책임만 담당

2. DIP 의존관계 역전 원칙 - 구체화가 아닌, `추상화`에 의존해야 한다
   - 초기에 'OrderServiceImpl'에서 'DiscountPolicy' 추상화 인터페이스에 의존하는 것 같았지만, 'FixDiscountPoliy' 구체화 구현 클래스에도 함께 의존했다.
   - AppConfig가 `FixDiscountPolicy` 객체 인스턴스를 클라이언트 코드 대신 생성해서 클라이언트 코드에 의존관계를 주입했다.

3. OCP 확장에는 open / 변경에는 closed
    - 다형성 사용 & 클라이언트가 DIP 지킴
    - 애플리케이션 -> 사용 영역 | 구성 영역



------

### IoC, DI, 컨테이너 

1. IoC - 제어의 역전 (Inversion of Control)
   - 프로그램에 대한 제어 흐름에 대한 권한은 `AppConfig`가 가지고 있음
   - 이렇게 프로그램에 대한 제어 흐름을 직접 제어가 아니라 외부에서 제어하는 것을 제어의 역전

 > #### 프레임워크 / 라이브러리
 > 내가 작성한 코드를 제어하고, 대신 실행하면 그건 `프레임워크`
> 
 > 내가 작성한 코드가 직접 제어의 흐름을 담당한다면 그건 `라이브러리`
 
2. DI 의존관계 주입 (Dependency Injection)
   - 의존관계는 `정적인 클래스 의존관계` & `실행 시점에 결정되는 동적인 객체(인스턴스) 의존관계` 고려해서 생각

3. 컨테이너
   - AppConfig 처럼 객체 생성 & 관리 & 의존관계 연결해주는 것을 `IoC Container / DI Container`
   - 주로 DI 컨테이너
   - 오브젝트 팩토리