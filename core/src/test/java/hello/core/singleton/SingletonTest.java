package hello.core.singleton;

import hello.core.AppConfig;
import hello.core.member.MemberService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import static org.assertj.core.api.Assertions.assertThat;

public class SingletonTest {
    @Test
    @DisplayName("스프링 없는 순수한 DI 컨테이너")
    void pureContainer() {
        AppConfig appConfig = new AppConfig();
        // 1. 조회 : 호출할 때마다 객체를 생성
        MemberService memberService1 = appConfig.memberService();

        // 2. 조회 : 호출할 때마다 객체를 생성
        MemberService memberService2 = appConfig.memberService();
        
        // 참조값이 다른 것을 확인
        System.out.println("memberService1 = " + memberService1);
        System.out.println("memberService2 = " + memberService2);

        // 객체가 새로 생성되어짐 -> 웹 어플리케이션같은 경우, 동시에 요청되는 경우가 많은데 계속 생성되는 것은 효율적이지 않다.
        //memberService1 = hello.core.member.MemberServiceImpl@5fcd892a
        //memberService2 = hello.core.member.MemberServiceImpl@8b87145

        // memberService != memerService2
        assertThat(memberService1).isNotSameAs(memberService2);

        // 이렇게 만든 순수한 DI 컨테이너인 AppConfig는 요청 시 객체 새로 생성
        // 만약 고객 트래픽이 초당 100 -> 초당 100개 객체 생성&소멸 ->> 메모리 낭비가 심하다!

        // 해결 방안 : 해당 객체는 딱 1개만 생성, 공유하도록 설계 :: `싱클톤 패턴`
    }

    @Test
    @DisplayName("싱글톤 패턴 적용한 객체 사용")
    void singletonService() {
        SingletonService singletonService1 = SingletonService.getInstance();
        SingletonService singletonService2 = SingletonService.getInstance();

        System.out.println("singletonService1 = " + singletonService1);
        System.out.println("singletonService2 = " + singletonService2);
        // 같게 나오는 것을 확인할 수 있다!
        // 이미 생성된 것을 가져와서 사용하는 것
        //singletonService1 = hello.core.singleton.SingletonService@1068e947
        //singletonService2 = hello.core.singleton.SingletonService@1068e947

        assertThat(singletonService1).isSameAs(singletonService2);
    }

    @Test
    @DisplayName("스프링 컨테이너 & 싱글톤")
    void springContainger() {
        //AppConfig appConfig = new AppConfig();
        ApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);
        // 1. 조회 : 호출할 때마다 객체를 생성
        MemberService memberService1 = ac.getBean("memberService", MemberService.class);

        // 2. 조회 : 호출할 때마다 객체를 생성
        MemberService memberService2 = ac.getBean("memberService", MemberService.class);

        // 참조값이 다른 것을 확인
        System.out.println("memberService1 = " + memberService1);
        System.out.println("memberService2 = " + memberService2);

        //memberService1 = hello.core.member.MemberServiceImpl@6304101a
        //memberService2 = hello.core.member.MemberServiceImpl@6304101a

        assertThat(memberService1).isSameAs(memberService2);

        // 근데 이렇게 만들었을때, 같은 객체를 반환하는 싱글톤 방식만 지원하는게 아니라
        // 앞서 한것처럼 다른 객체를 생성하고 반환하는 기능도 제공한다함(빈 스코프) 그치만 99%는 싱글톤을 사용한다!
    }
}
