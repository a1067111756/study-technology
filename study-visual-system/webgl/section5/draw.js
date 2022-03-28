/* 点线绘制封装 */
class Poly {
    gl = null
    vertices = []
    geoData = []
    size = 2
    attrName = 'a_Position'
    count = 0
    types = ['POINTS']

    constructor(attr) {
        Object.assign(this, attr)
        this.init()
    }

    init () {
        const { attrName, size, gl} = this
        if (!gl) return

        // 创建缓冲区
        const vertexBuffer = gl.createBuffer()
        // 将缓冲区绑定到gl上下文
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

        // 将缓冲区对象分配给attribute 变量
        const a_Position = gl.getAttribLocation(gl.program, attrName)
        gl.vertexAttribPointer(a_Position, size, gl.FLOAT, false, 0, 0)
        // 开启顶点数据的批处理功能
        gl.enableVertexAttribArray(a_Position)

        // 清理画布
        gl.clearColor(0.0, 0.0, 0.0, 1.0)
        gl.clear(gl.COLOR_BUFFER_BIT)
    }

    updateBuffer () {
        const { vertices, gl} = this
        this.updateCount()

        // 将数据写入缓冲区
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
    }

    updateCount () {
        this.count = this.vertices.length / this.size
    }

    updateVertices (params) {
        const {geoData}=this
        const vertices=[]
        geoData.forEach(data=>{
            params.forEach(key=>{
                vertices.push(data[key])
            })
        })
        this.vertices=vertices
    }

    addVertice (...params){
        this.vertices.push(...params)
        this.updateBuffer()
    }

    popVertice (){
        const {vertices,size}=this
        const len=vertices.length
        vertices.splice(len-size,len)
        this.updateCount()
    }

    setVertice (ind,...params){
        const {vertices,size}=this
        const i=ind*size
        params.forEach((param,paramInd)=>{
            vertices[i+paramInd]=param
        })
    }

    draw (types = this.types) {
        const {gl,count}=this
        gl.clear(gl.COLOR_BUFFER_BIT)
        for(let type of types){
            gl.drawArrays(gl[type],0,count);
        }
    }
}