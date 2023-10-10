package hello.core.web;

import hello.core.common.MyLogger;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import static java.lang.Thread.sleep;

@Controller
@RequiredArgsConstructor
public class LogDemoController {

    private final LogDemoService logDemoService;
    //private final ObjectProvider<MyLogger> myLoggerProvider;
    private final MyLogger mylogger;

    @RequestMapping("log-demo")
    @ResponseBody
    public String logDemo(HttpServletRequest request) throws InterruptedException {
        // 필요한 시점에서 주입
        //MyLogger mylogger = myLoggerProvider.getObject();
        String requestURL = request.getRequestURL().toString();
        System.out.println(
                "myLogger = " + mylogger.getClass()
        );
        mylogger.setRequestURL(requestURL);

        mylogger.log("controller test");
        sleep(1000);
        logDemoService.logic("testID");
        return "OK";
    }
}
