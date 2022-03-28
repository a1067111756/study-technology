// 方法 - 获取鼠标点击在webGl坐标体系下的坐标
function convertCoordToWebGl (canvas, clientX, clientY) {
    // 1. canvas画布顶点坐标
    const { left, top } = canvas.getBoundingClientRect()

    // 2. 计算点击位置 -（相对于canvas画布， 画布左上角）
    const [canvasX, canvasY] = [
        clientX - left,
        clientY - top
    ]

    const [halfCanvasWidth, halfCanvasHeight] = [ canvas.width / 2, canvas.height / 2]
    // 3. 解决webgl的坐标体系原点在中心点位置 -（canvas的坐标起始点在左上方，webgl在中心点）
    const [xBaseCenter, yBaseCenter] = [canvasX - halfCanvasWidth, clientY - halfCanvasHeight]
    // 4. 解决webgl的坐标体系y轴是反方向 - （canvas的y轴向下，webgl的y轴向上）
    const yBaseCenterTop = -yBaseCenter
    // 5. 解决webgl坐标体系单位 - (canvas的坐标体系单位是1像素，webgl的坐标体系单位是半个canvas大小)
    const [webglX, webglY] = [xBaseCenter / halfCanvasWidth, yBaseCenterTop / halfCanvasHeight]

    return [webglX, webglY]
}