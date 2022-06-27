package product;

public class DbHandler extends IOHandler{
    @Override
    public void add(String id, String name) {
        System.out.print("DbHandler add method call!\n");
    }

    @Override
    public void remove(String id) {
        System.out.print("DbHandler remove method call!\n");
    }

    @Override
    public void update(String id, String name) {
        System.out.print("DbHandler update method call!\n");
    }

    @Override
    public void query(String id) {
        System.out.print("DbHandler query method call!\n");
    }
}
