public class Application {
    public static void main(String[] args) {
        Product product = new Product.Builder()
            .setWidth(30)
            .setHeight(20)
            .setShape("square")
            .build();
        product.logInfo();

        BeefHamburgBuilder builder = new BeefHamburgBuilder();
        Hamburg hamburg = HamburgDirector.constructor1(builder, "beef", 3);
        hamburg.getInfo();
    }
}
