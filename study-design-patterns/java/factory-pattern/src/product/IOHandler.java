package product;

public abstract class IOHandler {
    public abstract void add(String id, String name);

    public abstract void remove(String id);

    public abstract void update(String id, String name);

    public abstract void query(String id);
}
