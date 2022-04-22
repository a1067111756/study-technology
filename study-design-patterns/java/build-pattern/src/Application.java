public class Application {
    public static void main(String[] args) {
        Product product = new Product.Builder().setWidth(30).setHeight(20).setShape("square").build();
        System.out.print(product.logInfo());
    }
}
