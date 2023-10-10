package hello.core;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;

@Configuration
@ComponentScan(
        excludeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = Configuration.class)
        // AppConfig 제외하기 위해
        // 위치는 패키지 위치 지정하지 않고, 프로젝트 최상단에 두기 (여기는 `hello.core`) -> 최근 스프링부트도 이 방법을 기본으로 제공
        // @SpringBootApplication -> @ComponentScan 이 포함되어있다 / 자동으로 등록됨!

        // 컴포넌트 스캔 기본 대상
        // @Component - 컴포넌트 스캔
        // @Controller - 스프링 MVC  컨트롤러
        // @Service - 스프링 비즈니스 로직
        // @Repository - 스프링 데이터 접근 계층
        // @Configuration - 스프링 설정 정보
)
public class AutoAppConfig {


}
