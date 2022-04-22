const LazySingleton = function (name) {
    this.name = name;
    this.instance = null
};

LazySingleton.getInstance = function (name) {
    if (!this.instance) {
        this.instance = new LazySingleton(name)
    }

    return this.instance
}

export default LazySingleton
