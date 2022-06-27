package product;

public class FileHandler extends IOHandler{
    @Override
    public void add(String id, String name) {
        System.out.print("FileHandler add method call!\n");
    }

    @Override
    public void remove(String id) {
        System.out.print("FileHandler remove method call!\n");
    }

    @Override
    public void update(String id, String name) {
        System.out.print("FileHandler update method call!\n");
    }

    @Override
    public void query(String id) {
        System.out.print("FileHandler query method call!\n");
    }
}
