
const cells = document.querySelectorAll('.sdk-cell');
const sizeSDK = 9; // 9x9


//gap trong grid
const gridGame = () => {
    function gapCustom(sizeSDK, cells) {
        let index = 0;
        for (let i = 0; i < sizeSDK * sizeSDK; i++) {
            let col = i % sizeSDK;
            let row = Math.floor(i / sizeSDK);
            if (col === 2 || col === 5) cells[index].style.marginRight = '10px';
            if (row === 2 || row === 5) cells[index].style.marginBottom = '10px';
            index++;
        }
    }
    gapCustom(sizeSDK, cells);
}

// hover
const restBg = () => {
    cells.forEach(x => x.classList.remove('hover'))
}

const hoverBg = (vitri) => {
    let row = Math.floor(vitri / sizeSDK);
    let col = vitri % sizeSDK;
    let rowBox = row - row % 3;//vị trí bắt đầu của hàng 3x3 
    let colBox = col - col % 3;//vị trí bắt đầu của cột 3x3 

    //trong 1 cột
    let step  = 9;
    while(vitri - step >= 0){//điều kiện trên
        cells[vitri - step].classList.add('hover');
        step += 9;
    }

    step  = 9;
    while(vitri + step < 80){//điều kiện dưới
        cells[vitri + step].classList.add('hover');
        step += 9;
    }

    //trong 1 hàng
    step = 1;
    while(vitri - step >= 9*row){//điều kiện trên 9*row (giới hạn chặn/ giá trị bắt đầu của hàng)
        cells[vitri - step].classList.add('hover');
        step += 1;
    }

    step = 1;
    while(vitri + step < 9*row + 9){//điều kiện dưới 9*row + 9 (giới hạn chặn/ giá trị kết thúc của hàng)
        cells[vitri + step].classList.add('hover');
        step += 1;
    }   
    
    //3x3
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
          cells[9*(rowBox + i) + (colBox + j)].classList.add('hover');
        }
    }
}

//chạy hover và click 
const playBg = () => {
    cells.forEach((e, vitri) => {
        e.addEventListener('click', () =>  {
            cells.forEach(e => e.classList.remove('selected'));
            e.classList.add('selected');
            restBg();
            hoverBg(vitri);
        }); 

           
    })
}


//chạy game
const games = ()=>{
    gridGame();
    playBg();
}

games();