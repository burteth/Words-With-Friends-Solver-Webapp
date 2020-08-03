
export function indexToPos(tileNum){
    /*
    Input:
        ex) 123
    Output:
        ex) { row: 8, col: 3}
    */

    var rowNum = Math.floor(tileNum / 15);
    var colNum = (tileNum % 15);
    return( {
        row : rowNum,
        col : colNum
    })

}
export function posToIndex(rowNum, colNum){ 
    return( (rowNum*15) + colNum )
}