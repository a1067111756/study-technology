public class Product {
    private final int width;
    private final int height;
    private final String shape;

    public Product(int width, int height, String shape) {
        this.width = width;
        this.height = height;
        this.shape = shape;
    }

    public String logInfo() {
        return "width:" + this.width + ", height:" + this.height + ", shape:" + this.shape;
    }

    static class Builder {
        private int width;
        private int height;
        private String shape;

        public Builder setWidth(int width) {
            this.width = width;
            return this;
        }

        public Builder setHeight(int height) {
            this.height = height;
            return this;
        }

        public Builder setShape(String shape) {
            this.shape = shape;
            return this;
        }

        public Product build() {
            return new Product(this.width, this.height, this.shape);
        }
    }
}
