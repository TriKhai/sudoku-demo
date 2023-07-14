//tạo ra bảng giá trị

//tạo mảng 2 chiều
const creadArr = ()=>{
    const arr = new Array(9);
    for(let i=0; i<9; i++){
        arr[i] = new Array(9).fill(0);
    }
    fillArr(arr);//điền số vào mảng
    return arr;
};

    //lắp vào ô
const fillArr = (arr)=>{
    //tìm ô trống
    const oTrong = timOTrong(arr);
    if(!oTrong){
        return true;//đã điền xong
    }
    const [row, col] = oTrong;//lưu tọa độ ô trống
    //tạo ra 1 row chứa giá trị trước
    const numbers = tronNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        
    for(let num of numbers){
        if(checkValue(arr, row, col, num)){
            arr[row][col] = num;
            if(fillArr(arr)){
                return true;//đệ qui cho đến khi điền xong hết số, phù hợp
            }
            arr[row][col] = 0//nếu số không phù hợp thì sẽ quay lui lại ô trước điền số khacs
        }
    }
    return false;//coi hêt 9 số không số nào điền đc
};

//tìm ô trống
const timOTrong = (arr)=>{
    for(let row = 0; row<9; row++){
        for(let col = 0; col<9; col++){
            if(arr[row][col] === 0){
                return [row, col];//mảng chứa vị trí
            }
        }
    }
    return null;
};

//kiểm tra điều kiện
const checkValue = (arr, row, col, num)=>{
    //check row
    for(let c = 0; c<9; c++){
        if(arr[row][c] === num && c !== col)//i!==col là khác ô hiện tại
        {
            return false;
        }
    }

    //check col
    for(let r = 0; r<9; r++){
        if(arr[r][col] === num && r !== row){
            return false;
        }
    }

    //check 3x3
    const sRow = row - row%3;
    const sCol = col - col%3;
    for(let r=0; r<3; r++){
        for(let c =0; c<3; c++){
            if(arr[sRow+r][sCol+c] === num && (([sRow+r]!==row) || [sCol+c]!==col)){
                return false;
            }//nếu ô đó có trùng số và tọa độ row, col khac 1 trong 2 thì nó bị trùng
        }
    }
    return true;
};

//hàm trộn các con số từ 1 đến 9
const tronNumbers = (arrNum)=>{
    arrNum.sort(()=>Math.random()-0.5);
    return arrNum;
}

//xóa ô trong cái mảng=> chế dộ chơi
const xoaOBatKi = (array)=>{
    let num = 90;//chỉnh cố lần lặp của bỏ lổ
    for(i=0; i<num; i++){
       let row = Math.floor(Math.random()*9);
       let col = Math.floor(Math.random()*9);
       array[row][col] = '';
    }
    return array;
}

const boardSdk = xoaOBatKi(creadArr());
// const boardSdk = [  //create sudoku board
//     [1,2,3,4,5,6,7,8,''],
//     [4,5,6,7,8,9,1,2,3],
//     [7,8,9,1,2,3,4,5,6],
//     [2,3,4,5,6,7,8,9,1],
//     [5,6,7,8,9,1,2,3,4],
//     [8,9,1,2,3,4,5,6,7],
//     [3,4,5,6,7,8,9,1,2],
//     [6,7,8,9,1,2,3,4,5],
//     [9,1,2,3,4,5,6,7,8]
// ]

//lấy các ô của input
const elems = document.getElementsByClassName('sdk-cell');

//đổ dữ liệu vào
const pushCells = ()=>{
    for(let row = 0; row < 9; row++){
        for(let col = 0; col < 9; col++){
            elems[row*9 + col].value = boardSdk[row][col];
        }
    }
}

//check vô hiệu hóa nhập chữ vào input
//làm vô hiệu hóa
const onlyRI = document.getElementsByClassName('oReadInput');
const duyetPhanTu = ()=>{
    for(const a of onlyRI) {
        a.readOnly = true;
    }
}

//đánh dấu only Read
const onlyReadInput = ()=>{
    for(const cell of elems) {
        if(cell.value !== ''){
            cell.classList.add('oReadInput');
        }
    }
}

//nút check
const btnCheck = document.getElementById('btn-check');
btnCheck.addEventListener('click', ()=>{    
    const userBoard = getUserInput();
    console.log(kiemTraSudoku(userBoard));//
    if(kiemTraSudoku(userBoard)){
        alert("TRUE");
    }else{
        alert("FALSE");
    }
})

//lấy dữ liệu người dùng
const getUserInput = ()=>{
    const userBoard = [];
    for(let row =0; row < 9; row++){
        userBoard[row] = [];
        for(let col =0; col < 9; col++){
            const value = elems[row*9 + col].value;
            userBoard[row][col] = value?parseInt(value): '';
        }
    }
    return userBoard;
    // console.log(userBoard);//
}


//check đáp án
const kiemTraSudoku = (userBoard)=>{
    //kiem tra hang
    for(let row = 0; row < 9; row++){
        if(!checkValuesRowCol(userBoard[row])){
            return false;
        }
    }

    //kiem tra cot
    for(let col = 0; col < 9; col++){
        const tmp = [];
        for(let row =0; row<9; row++){
            tmp.push(userBoard[row][col]);
        }
        if(!checkValuesRowCol){
            return false;
        }
    }

    //kiem tra khoi
    //chỉ lấy ra chỉ số đầu
    for(let row = 0; row <6; row+=3){
        for(let col = 0; col <=6; col+=3){
            // cBox = checkValuesBox(row, col);
            if(!checkValuesBox(row, col)){
                return 0;
            }
        }
    }
    
    return true;
} 

// check hàng và cột
const checkValuesRowCol = (values)=>{
    const sets = new Set();
    for(const value of values){
        if(value === '' || value === 0 || !Number.isInteger(value)){
            return false;
        }
        if (sets.has(value)){
            return false;
        }
        sets.add(value);
    }
    return true;
}

//check khối
const checkValuesBox = (row, col)=>{
    const sets = new Set();
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(sets.has(String(elems[9*(row + i) + (col + j)]))){
                return false;
            }else{
                sets.add(elems[9*(row + i) + (col + j)]);
            }
        }
    }
    return true;
}

//đánh dấu đáp án sai

//chạy
const run = ()=>{
    pushCells();

    //vô hiệu hóa input
    onlyReadInput();
    duyetPhanTu();

    //
}

run();
console.log(boardSdk);//