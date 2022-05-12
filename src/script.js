
const board = [
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
]


//Referencias do DOM
const cells = document.querySelectorAll("td")
let redPieces = document.querySelectorAll("p")
let whitePieces = document.querySelectorAll("span")
const redTurnText = document.querySelector(".red-turn-text")
const whiteTurnText = document.querySelector(".white-turn-text")
const divinder = document.querySelector("#divider")

//Propriedades do Jogador
let turn = true;
let redScore = 12;
let whiteScore = 12;
let playerPieces;

let selectedPiece = {
    pieceId: -1,
    indexOfBoardPiece: -1,
    isKing: false,
    seventhSpace: false,
    ninthSpace: false,
    fourteenthSpace: false,
    eightteenthSpace: false,
    minusSeventhSpace: false,
    minusNinthSpace: false,
    minusFourteenthSpace: false,
    minusEightteenthSpace: false

}

function givePiecesEventListeners() {
    if (turn) {
        for (let i = 0; i < redPieces.length; i++) {
            redPieces[i].addEventListener("click", getPlayerPieces)
        }
    } else {
        for (let i = 0; i < whitePieces.length; i++) {
            whitePieces[i].addEventListener("click", getPlayerPieces)
        }
    }

}

function getPlayerPieces() {
    if (turn) {
        playerPieces = redPieces;
    } else {
        playerPieces = whitePieces;
    }

    removeCellonclick()
    resetBorders()

}

function removeCellonclick() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeAttribute("onclick")
    }
}

function resetBorders() {
    for (let i = 0; i < playerPieces.length; i++) {
        if (turn) {
            playerPieces[i].style.border = "4px white inset"
        } else{
            playerPieces[i].style.border = "4px red inset"
        }
    }
    resetSelectedPieceProperties()
    getSelectedPiece()
}

function resetSelectedPieceProperties() {
    selectedPiece.pieceId = -1
    selectedPiece.isKing = false
    selectedPiece.seventhSpace = false
    selectedPiece.ninthSpace = false
    selectedPiece.fourteenthSpace = false
    selectedPiece.eightteenthSpace = false
    selectedPiece.minusSeventhSpace = false
    selectedPiece.minusNinthSpace = false
    selectedPiece.minusFourteenthSpace = false
    selectedPiece.minusEightteenthSpace = false
}

function getSelectedPiece() {
    selectedPiece.pieceId = parseInt(event.target.id)
    selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId)
    isPieceKing()
}

let findPiece = function (pieceId) {
    let parsed = parseInt(pieceId)
    return board.indexOf(parsed)
}

function isPieceKing() {
    if (document.getElementById(selectedPiece.pieceId).classList.contains("king")) {
        selectedPiece.isKing = true
    } else {
        selectedPiece.isKing = false
    }
    getAvailableSpaces()
}

function getAvailableSpaces() {
    if (board[selectedPiece.indexOfBoardPiece + 7] === null &&
        cells[selectedPiece.indexOfBoardPiece + 7].classList.contains("noPieceHere") !== true) {
        selectedPiece.seventhSpace = true
    }

    if (board[selectedPiece.indexOfBoardPiece + 9] === null &&
        cells[selectedPiece.indexOfBoardPiece + 9].classList.contains("noPieceHere") !== true) {
        selectedPiece.ninthSpace = true
    }

    if (board[selectedPiece.indexOfBoardPiece - 7] === null &&
        cells[selectedPiece.indexOfBoardPiece - 7].classList.contains("noPieceHere") !== true) {
        selectedPiece.minusSeventhSpace = true
    }

    if (board[selectedPiece.indexOfBoardPiece - 9] === null &&
        cells[selectedPiece.indexOfBoardPiece - 9].classList.contains("noPieceHere") !== true) {
        selectedPiece.minusNinthSpace = true
    }
    checkAvailableJumpSpaces()
}

function checkAvailableJumpSpaces() {
    if (turn) {
        if (board[selectedPiece.indexOfBoardPiece + 14] === null &&
            cells[selectedPiece.indexOfBoardPiece + 14].classList.contains("noPieceHere") !== true &&
            board[selectedPiece.indexOfBoardPiece + 7] >= 12) {
            selectedPiece.fourteenthSpace = true
        }
        if (board[selectedPiece.indexOfBoardPiece + 18] === null &&
            cells[selectedPiece.indexOfBoardPiece + 18].classList.contains("noPieceHere") !== true &&
            board[selectedPiece.indexOfBoardPiece + 9] >=12) {
                selectedPiece.eightteenthSpace = true
        }
        if (board[selectedPiece.indexOfBoardPiece - 14] === null &&
            cells[selectedPiece.indexOfBoardPiece - 14].classList.contains("noPieceHere") !== true &&
            board[selectedPiece.indexOfBoardPiece - 7] >= 12) {
                selectedPiece.minusFourteenthSpace = true
        }
        if (board[selectedPiece.indexOfBoardPiece - 18] === null &&
            cells[selectedPiece.indexOfBoardPiece - 18].classList.contains("noPieceHere") !== true &&
            board[selectedPiece.indexOfBoardPiece - 9] >= 12) {
                selectedPiece.minusEightteenthSpace = true
        }
        
    } else {
        if (board[selectedPiece.indexOfBoardPiece + 14] === null &&
            cells[selectedPiece.indexOfBoardPiece + 14].classList.contains("noPieceHere") !== true &&
            board[selectedPiece.indexOfBoardPiece + 7] < 12 && board[selectedPiece.indexOfBoardPiece + 7] !== null) {
            selectedPiece.fourteenthSpace = true
        }
        if (board[selectedPiece.indexOfBoardPiece + 18] === null &&
            cells[selectedPiece.indexOfBoardPiece + 18].classList.contains("noPieceHere") !== true &&
            board[selectedPiece.indexOfBoardPiece + 9] < 12 && board[selectedPiece.indexOfBoardPiece + 9] !== null) {
            selectedPiece.eightteenthSpace = true
        }
        if (board[selectedPiece.indexOfBoardPiece - 14] === null &&
            cells[selectedPiece.indexOfBoardPiece - 14].classList.contains("noPieceHere") !== true &&
            board[selectedPiece.indexOfBoardPiece - 7] < 12 && board[selectedPiece.indexOfBoardPiece - 7] !== null) {
            selectedPiece.minusFourteenthSpace = true
        }
        if (board[selectedPiece.indexOfBoardPiece - 18] === null &&
            cells[selectedPiece.indexOfBoardPiece - 18].classList.contains("noPieceHere") !== true &&
            board[selectedPiece.indexOfBoardPiece - 9] < 12 && board[selectedPiece.indexOfBoardPiece - 9] !== null) {
            selectedPiece.minusEightteenthSpace = true
        }
        
    }

    checkPieceConditions()
}

function checkPieceConditions() {
    if (selectedPiece.isKing) {
        givePieceBorder();
    } else {
        if (turn) {
            selectedPiece.minusSeventhSpace = false
            selectedPiece.minusNinthSpace = false
            selectedPiece.minusFourteenthSpace = false
            selectedPiece.minusEightteenthSpace = false
        } else {
            selectedPiece.seventhSpace = false
            selectedPiece.ninthSpace = false
            selectedPiece.eightteenthSpace = false
            selectedPiece.fourteenthSpace = false
        }
        givePieceBorder()
    }
}

function givePieceBorder() {
    if (selectedPiece.seventhSpace || selectedPiece.ninthSpace || selectedPiece.fourteenthSpace || selectedPiece.eightteenthSpace
        || selectedPiece.minusSeventhSpace || selectedPiece.minusNinthSpace || selectedPiece.minusFourteenthSpace || selectedPiece.minusEightteenthSpace) {
        document.getElementById(selectedPiece.pieceId).style.border = "4px green inset"
        giveCellsClick()
    } else {
        return;
    }
}

function giveCellsClick() {
    if (selectedPiece.seventhSpace) {
        cells[selectedPiece.indexOfBoardPiece + 7].setAttribute("onClick", "makeMove(7)")
    }
    if (selectedPiece.ninthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 9].setAttribute("onClick", "makeMove(9)")
    }
    if (selectedPiece.fourteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 14].setAttribute("onClick", "makeMove(14)")
    }
    if (selectedPiece.eightteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 18].setAttribute("onClick", "makeMove(18)")
    }
    if (selectedPiece.minusSeventhSpace) {
        cells[selectedPiece.indexOfBoardPiece - 7].setAttribute("onClick", "makeMove(-7)")
    }
    if (selectedPiece.minusNinthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 9].setAttribute("onClick", "makeMove(-9)")
    }
    if (selectedPiece.minusFourteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 14].setAttribute("onClick", "makeMove(-14)")
    }
    if (selectedPiece.minusEightteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 18].setAttribute("onClick", "makeMove(-18)")
    }
}

function makeMove(number) {
    document.getElementById(selectedPiece.pieceId).remove()
    cells[selectedPiece.indexOfBoardPiece].innerHTML = ""
    if (turn) {
        if (selectedPiece.isKing) {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class = "red-piece king" id="${selectedPiece.pieceId}"></p>`
            redPieces = document.querySelectorAll("p")
        } else {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class = "red-piece" id="${selectedPiece.pieceId}"></p>`
            redPieces = document.querySelectorAll("p")
        }
    } else {
        if (selectedPiece.isKing) {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class = "white-piece king" id="${selectedPiece.pieceId}"></span>`
            whitePieces = document.querySelectorAll("span")
        } else {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class = "white-piece" id="${selectedPiece.pieceId}"></span>`
            whitePieces = document.querySelectorAll("span")
        }
    }

    let indexOfPiece = selectedPiece.indexOfBoardPiece
    if (number === 14 || number === -14 || number === 18 || number === -18) {
        changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2)
    } else {
        changeData(indexOfPiece, indexOfPiece + number)
    }
}

function changeData(indexOfBoardPiece, modifiedIndex, removePiece) {
    board[indexOfBoardPiece] = null
    board[modifiedIndex] = parseInt(selectedPiece.pieceId)
    if (turn && selectedPiece.pieceId < 12 && modifiedIndex >= 57) {
        document.getElementById(selectedPiece.pieceId).classList.add("king")
    }
    if (!turn && selectedPiece.pieceId >= 12 && modifiedIndex <= 7) {
        document.getElementById(selectedPiece.pieceId).classList.add("king")
    }
    if (removePiece) {
        board[removePiece] = null
        if (turn && selectedPiece.pieceId < 12) {
            cells[removePiece].innerHTML = ""
            whiteScore--

        }
        if (!turn && selectedPiece.pieceId >= 12) {
            cells[removePiece].innerHTML = ""
            redScore--
        }
    }
    resetSelectedPieceProperties()
    removeCellonclick()
    removeEventListeners()
}

function removeEventListeners() {
    if (turn) {
        for (let i = 0; i < redPieces.length; i++) {
            redPieces[i].removeEventListener("click", getPlayerPieces)
        }
    } else {
        for (let i = 0; i < whitePieces.length; i++) {
            whitePieces[i].removeEventListener("click", getPlayerPieces)
        }
    }
    checkForWin()
}

function checkForWin() {
    if (whiteScore === 0) {
        divinder.style.display = "none"
        redTurnText.style.color = "black"
        whiteTurnText.style.display = "none"
        redTurnText.textContent = "Red Wins"

    } else if (redScore === 0) {
        divinder.style.display = "none"
        whiteTurnText[i].style.color = "black"
        redTurnText[i].style.display = "none"
        redTurnText[i].textContent = "White Wins"

    }
    changePlayer()
}

function changePlayer() {
    if (turn) {
        turn = false
        redTurnText.style.color = "lightgray"
        whiteTurnText.style.color = "black"
    } else {
        turn = true
        whiteTurnText.style.color = "lightgray"
        redTurnText.style.color = "black"
    }

    givePiecesEventListeners()
}

givePiecesEventListeners()

