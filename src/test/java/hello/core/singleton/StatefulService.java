package hello.core.singleton;

public class StatefulService {

    private int price; // 상태 유지하는 필드
    public void order(String name, int price) {
        System.out.println("name = " + name + " price = " + price);
        this.price = price; // 이게 문제입니다!
    }

    public int getPrice() {
        return price;
    }
    //test 만드는 단축기 : command + shift + T
}
