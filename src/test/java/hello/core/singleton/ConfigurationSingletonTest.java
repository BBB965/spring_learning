package hello.core.singleton;

import hello.core.AppConfig;
import hello.core.member.MemberRepository;
import hello.core.member.MemberServiceImpl;
import hello.core.order.OrderServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class ConfigurationSingletonTest {

    // 출력이 이렇게 된다

    //AppConfig.memberService
    //AppConfig.memberRepository
    //AppConfig.orderService
    @Test
    void configurationTest() {
        ApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

        MemberServiceImpl memberService = ac.getBean("memberService", MemberServiceImpl.class);
        OrderServiceImpl orderService = ac.getBean("orderService", OrderServiceImpl.class);
        //MemberRepository memberRepository = ac.getBean("memberRepository", MemberRepository.class);

        MemberRepository memberRepository1 = memberService.getMemberRepository();
        MemberRepository memberRepository2 = orderService.getMemberRepository();
        System.out.println("memberService->memberRepository = " + memberRepository1);
        System.out.println("orderService->memberRepository = " + memberRepository2);
        //System.out.println("memberRepository = " + memberRepository);

        // 둘이 같은 것을 참조한다!!!
        //memberService memberRepository = hello.core.member.MemoryMemberRepository@1f75a668
        //orderService memberRepository = hello.core.member.MemoryMemberRepository@1f75a668

        Assertions.assertThat(memberRepository1).isSameAs(memberRepository2);
    }

    @Test
    void configurationDeep() {
        ApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);
        AppConfig bean = ac.getBean(AppConfig.class);

        System.out.println("bean.getClass() = " + bean.getClass());
        //bean.getClass() = class hello.core.AppConfig$$SpringCGLIB$$0

        // 순수한 클래스면? class hello.core.AppConfig
        // 그렇다면 불러온 것은 내가 만든 클래스가 아니라, 스프링이 CGLIB라는 바이트코드 조작 라이브러리르 사용해서
        // AppConfig 클래스를 상속받은 임의의 다른 클래스를 만들고, 그 다른 클래스를 스프링 빈으로 등록한 것

        // AppConfig@CGLIB 여기에 따로 등록
        // MemberService 없네? 등록( 기존 로직 호출. 그 과정에서 `AppConfig.memberService` 출력)
        // -> MemberRepository 없네? 등록 ( 기존 로직 호출. 그 과정에서 `AppConfig.memberRepository` 출력)
        //
        // OrderService 없네? 등록( 기존 로직 호출. 그 과정에서 `AppConfig.orderService` 출력)
        // -> MemberRepository 있네? 기존에 등록 되어있는거 반환

    }
}
