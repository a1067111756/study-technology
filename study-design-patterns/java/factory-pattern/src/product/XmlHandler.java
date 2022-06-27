package product;

public class XmlHandler extends IOHandler{
    @Override
    public void add(String id, String name) {
        System.out.print("XmlHandler add method call!\n");
    }

    @Override
    public void remove(String id) {
        System.out.print("XmlHandler remove method call!\n");
    }

    @Override
    public void update(String id, String name) {
        System.out.print("XmlHandler update method call!\n");
    }

    @Override
    public void query(String id) {
        System.out.print("XmlHandler query method call!\n");
    }
}
