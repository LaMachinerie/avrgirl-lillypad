var boards = [
  {
    name: 'lilypad-usb',
    baud: 57600,
    signature: new Buffer([0x43, 0x41, 0x54, 0x45, 0x52, 0x49, 0x4e]),
    productId: ['0x9207', '0x9208', '0x1B4F'],
    protocol: 'avr109'
  }
];

/**
 * Generate an object with board name keys for faster lookup
 * @return {object} byBoardName
 */
function boardLookupTable() {
  var byBoard = {};
  for (var i = 0; i < boards.length; i++) {
    var currentBoard = boards[i];
    byBoard[currentBoard.name] = currentBoard;

    var aliases = currentBoard.aliases;
    if (Array.isArray(aliases)) {
      for (var j = 0; j < aliases.length; j++) {
        var currentAlias = aliases[j];
        byBoard[currentAlias] = currentBoard;
      }
    }
  }
  return byBoard;
}

module.exports = boardLookupTable();
