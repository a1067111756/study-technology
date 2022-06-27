import factory.IOFactory;
import product.DbHandler;
import product.FileHandler;
import product.XmlHandler;

public class Application {
    public static void main(String[] args) {
        FileHandler fileHandler = IOFactory.getIOHandler(FileHandler.class);
        fileHandler.add("id", "name");

        XmlHandler xmlHandler = IOFactory.getIOHandler(XmlHandler.class);
        xmlHandler.query("id");

        DbHandler dbHandler = IOFactory.getIOHandler(DbHandler.class);
        dbHandler.remove("id");
    }
}
