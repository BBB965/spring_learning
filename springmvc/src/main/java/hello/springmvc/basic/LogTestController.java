package hello.springmvc.basic;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@Slf4j
@RestController
public class LogTestController {

    //private final Logger log = LoggerFactory.getLogger(getClass());

    @RequestMapping("/log-test")
    public String logTest() {
        String name = "Spring";

        // == log.debug("debug log =" + name);
        // 저걸 사용하지 않는 이유는 debug 로그 실행 전 연산 처리가 먼저 일어난다
        // 만약 로그로 찍히지 않게 레벨을 설정을 해 놓으면, 저건 메모리 차지, 비용만 더 들게 된다
        // 그래서 아래와 같이 하는 것이 좋다

        log.debug("debug log = {}", name);
        log.info("info log = {}", name);
        log.warn("warn log = {}", name);
        log.error("error log = {}", name);
        return "ok";
    }
}
