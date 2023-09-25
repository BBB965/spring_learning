import java.util.Iterator;
import java.util.NoSuchElementException;

public class MyLinkedList<T> implements Iterable<T>{
    private Node<T> head;
    private int size;

    private class Node<T> {
        T data;
        Node<T> next;

        Node(T data) {
            this.data = data;
            this.next = null;
        }
    }
    public MyLinkedList() {
        head = null;
        size = 0;
    }
    public void add(T data) {
        Node <T> newNode = new Node<>(data);
        if (head == null) {
            head = newNode;
        } else {
            Node<T> current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = newNode;
        }
        size++;
    }

    public T get(int index) {
        if (index < 0 || index >= size){
            throw new IndexOutOfBoundsException("Index out of bounds");
        }
        Node<T> current = head;
        for (int i = 0; i < index;i++) {
            current = current.next;
        }
        return current.data;
    }

    public void delete(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException("Index out of bounds");
        }
        if (index == 0) {
            head = head.next;
        } else {
            Node <T> current = head;
            for (int i = 0; i < index - 1; i++) {
                current = current.next;
            }
            current.next = current.next.next;
        }
        size--;
    }

    public class Queue {
        public static void main(String[] args) {
            MyLinkedList<Integer> queue = new MyLinkedList<>();
            //push
            queue.add(1);
            queue.add(2);
            queue.add(3);
            //pop
            int removedItem = queue.get(0);
            queue.delete(0);
        }
    }

    public class Stack {
        public static void main(String[] args) {
            MyLinkedList<Integer> stack = new MyLinkedList<>();
            // push_back
            stack.add(1);
            stack.add(2);
            stack.add(3);
            // pop_back
            int popedItem = stack.get(stack.size() - 1);
            stack.delete(stack.size() - 1);
        }
    }

    @Override
    public Iterator<T> iterator() {
        return new MyLinkedListIterator();
    }

    private class MyLinkedListIterator implements Iterator<T> {
        private Node<T> current = head;

        @Override
        public boolean hasNext() {
            return current != null;
        }

        @Override
        public T next() {
            if(!hasNext()) {
                throw new NoSuchElementException();
            }
            T data = current.data;
            current = current.next;
            return data;
        }
    }
    public int size() {
        return size;
    }
}
