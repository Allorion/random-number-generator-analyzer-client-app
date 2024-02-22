// @ts-nocheck
import {TSZip} from './tszip.min';

export class XLSXUni{
	public sheet: Sheet = null;
	public workBook: WorkBook = new WorkBook("Uni");
	public cell: Cell = null;
	public style: XLSXStyle = null;
	public merge: SheetMerge = null;

	constructor(){}
	ngOnInit(author) {
		this.workBook = new WorkBook(author);
	}
	
	getWorkBook(author='Uni'){return new WorkBook(author)}
	getSheet(name){return new Sheet(name)}
	getCell(data = null, style = null){return new Cell(data, style)}
	getStyle(number = 1, numFmtId = 0){return new XLSXStyle(number, numFmtId)}
	getMerge(firstCol, firstRow, lastCol, lastRow){return new SheetMerge(firstCol, firstRow, lastCol, lastRow)}
	
	save(name = 'file.xlsx'){return new RenderXLXS(this.workBook, name)}
	
	static exportDOMToXLSX(dom, name = 'export.xlsx'){
		let getStTb = function(td, colI, rowI){
			if(td.rowSpan == 1){
				if(colI == 0){
					return 9;
				}else if(colI != td.colSpan-1){
					return 10;
				}else{
					return 11;
				}
			}else if(td.colSpan == 1){
				if(rowI == 0){
					return 12;
				}else if(rowI != td.rowSpan-1){
					return 13;
				}else{
					return 14;
				}
			}else{
				if(rowI == 0){
					if(colI == 0){
						return 1;
					}else if(colI != td.colSpan-1){
						return 2;
					}else{
						return 3;
					}
				}else if(rowI != td.rowSpan-1){
					if(colI == 0){
						return 4;
					}else if(colI != td.colSpan-1){
						return null;
					}else{
						return 5;
					}
				}else{
					if(colI == 0){
						return 6;
					}else if(colI != td.colSpan-1){
						return 7;
					}else{
						return 8;
					}
				}
			}
		};
		let getStartCol = function(arr){
			if(typeof arr === 'undefined') return 0;
			if(arr.length == 0) return 0;
			let i;
			for(i = 0; i < arr.length; i++){
				if(typeof arr[i] == 'undefined') return i;
			}
			return i;
		};
		let fixCell = function(x){
			let a = x.trim()
			let b = a.replace(',', '.');
			if(!Number.isNaN(Number.parseFloat(b)) && b == Number.parseFloat(b))
				if (Number.parseFloat(b) < 100000000000) return Number.parseFloat(b);
				else return a + ' ';
			else return a;
		}
		let render = function(dom){
			let items = [];
			dom.forEach( d => {
				if(d.tagName == 'TABLE') {
					let table = {type: 'table', head: 0, merge: [], style: [], data: null, customWidth: {}}
					let tb = [];
					let row = 0;
					if(d.querySelector('thead') !== null)
					d.querySelector('thead').querySelectorAll('tr').forEach(tr => {
						table.head++;
						if(typeof tb[row] === 'undefined') tb[row] = [];
						if(typeof table.style[row] === 'undefined') table.style[row] = [];
						tr.querySelectorAll('th').forEach(th => {
							let col = getStartCol(tb[row]);
							tb[row][col] = fixCell(th.innerText);
							if(th.colSpan == 1){
								table.customWidth[col+1] = th.clientWidth / 9.;
								if(table.customWidth[col+1] < 3) table.customWidth[col+1] = 19;
							}
							if(th.rowSpan > 1 || th.colSpan > 1){
								table.merge.push([(col+1),(row+1),(col+th.colSpan),(row+th.rowSpan)]);
								for(let rowI = 0; rowI < th.rowSpan; rowI++){
									//if(rowI>0) col = getStartCol(tb[row+rowI]);
									for(let colI = 0; colI < th.colSpan; colI++){
										if(typeof table.style[row+rowI] === 'undefined') table.style[row+rowI] = Array();
										table.style[row+rowI][col+colI] = getStTb(th, colI, rowI);
										if(rowI==0){
											if(colI == 0) continue;
										}else{
											if(typeof tb[row+rowI] === 'undefined') tb[row+rowI] = Array();
										}
										tb[row+rowI][col+colI] = '';
									}
								}
							}else{
								table.style[row][col] = 0;
							}
						});
						row++;
					});
					if(d.querySelector('tbody') !== null)
					d.querySelector('tbody').querySelectorAll('tr').forEach(tr => {
						if(typeof tb[row] === 'undefined') tb[row] = [];
						if(typeof table.style[row] === 'undefined') table.style[row] = [];
						tr.querySelectorAll('td, th').forEach((td) => {
							let col = getStartCol(tb[row]);
							tb[row][col] = fixCell(td.innerText);
							if(td.colSpan == 1){
								table.customWidth[col+1] = td.clientWidth / 9.;
								if(table.customWidth[col+1] < 3) table.customWidth[col+1] = 20;
							}
							if(td.rowSpan > 1 || td.colSpan > 1){
								table.merge.push([(col+1),(row+1),(col+td.colSpan),(row+td.rowSpan)]);
								for(let rowI = 0; rowI < td.rowSpan; rowI++){
									//if(rowI>0) col = getStartCol(tb[row+rowI]);
									for(let colI = 0; colI < td.colSpan; colI++){
										if(typeof table.style[row+rowI] === 'undefined') table.style[row+rowI] = Array();
										table.style[row+rowI][col+colI] = getStTb(td, colI, rowI);
										if(rowI==0){
											if(colI==0) continue;
										}else{
											if(typeof tb[row+rowI] === 'undefined') tb[row+rowI] = Array();
										}
										tb[row+rowI][col+colI] = '';
									}
								}
							}else{
								table.style[row][col] = 0;
							}
						});
						row++;
					});
					table.data = tb;
					items.push(table);
				}else if (d.tagName == "BR") {
					items.push({type: 'text', data: '', tags: []});
				}else if(d.childNodes.length > 1){
					render(d.childNodes).forEach(i=>{items.push(i);});
				}
				else if(d.tagName != '#text' && d.innerText !== undefined){
					let item = {type: 'text', data: d.innerText, tags: []};
					//if(window.getComputedStyle(d).fontWeight > 500) item.tags.push('b');
					//if (d.classList.contains('xlsx-filter')) item.filter = true;
					/*if(d.classList.contains('xlsx-right')){ 
						item.row = ;
						rightItems.push(item);
					}*/
					//else
					items.push(item);
				}else if(d.tagName == '#text'){
					let item = {type: 'text', data: d.textContent, tags: []};
					items.push(item);
				}
			});
			return items;
		};

		const getNativeClass = function(obj:any) {
			if (typeof obj === "undefined") return "undefined";
			if (obj === null) return "null";
			return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1];
		}
		let items = [];
		let rightItems = [];
		let table = {};
		let filter = [];
		if(getNativeClass(dom) == 'NodeList'){
			items = render(dom);
		}else{
			items = render(dom.childNodes);
		}
		
		let exp: XLSXUni = new XLSXUni();
		exp.workBook.createSheet('List 1');
		let row = 1;
		let tableSt = false;
		let tableStyle = [];
		items.forEach( item => {
			if(item.type == 'text'){
				item.data.split('\n').forEach(text => {
					exp.workBook.addCell(0, row, text);
					row++;
				});
			}
			if(item.type == 'table'){
				let splap = exp.workBook.sheet[0].getMaxRow();
				if(!tableSt){
					XLSXUni.createStyleTable().forEach(st => {
						tableStyle.push(exp.workBook.addStyle(st));
					});
					XLSXUni.createStyleNumberTable().forEach(st => {
						tableStyle.push(exp.workBook.addStyle(st));
					});
					tableSt = true;
				}
				item.data.forEach((th, i) => {
					th.forEach((td, j) => {
						let st = 0;
						if(typeof item.style[i][j] != undefined){
							if(typeof td === 'number') st = tableStyle[item.style[i][j] + 15];
							else st = tableStyle[item.style[i][j]];
						} else if(typeof td === 'number') st = 2;
						exp.workBook.addCell(0, row, td, st);
					});
					row++;
				});
				item.merge.forEach( i => {
					exp.workBook.sheet[0].addMerges(i[0], i[1] + splap, i[2], i[3] + splap);
				});
				Object.keys(item.customWidth).forEach(k => {
					exp.workBook.sheet[0].setCustomWidth(item.customWidth[k], k);
				});
			}
		});
		return exp;
	}
	
	static createStyleTable(){
		let st0 = new XLSXStyle();
		st0.border = {
			left: ['thin', 'rgb="FF000000"'],
			right: ['thin', 'rgb="FF000000"'],
			top: ['thin', 'rgb="FF000000"'],
			bottom: ['thin', 'rgb="FF000000"'],
			diagonal: []
		};
		st0.alignment.wrapText = true;
		let st1 = new XLSXStyle();
		st1.border = {
			left: ['thin', 'rgb="FF000000"'],
			right: [],
			top: ['thin', 'rgb="FF000000"'],
			bottom: [],
			diagonal: []
		};
		st1.alignment.wrapText = true;
		let st2 = new XLSXStyle();
		st2.border = {
			left: [],
			right: [],
			top: ['thin', 'rgb="FF000000"'],
			bottom: [],
			diagonal: []
		};
		st2.alignment.wrapText = true;
		let st3 = new XLSXStyle();
		st3.border = {
			left: ['thin', 'rgb="FF000000"'],
			right: ['thin', 'rgb="FF000000"'],
			top: [],
			bottom: [],
			diagonal: []
		};
		st3.alignment.wrapText = true;
		let st4 = new XLSXStyle();
		st4.border = {
			left: ['thin', 'rgb="FF000000"'],
			right: [],
			top: [],
			bottom: [],
			diagonal: []
		};
		st4.alignment.wrapText = true;
		let st5 = new XLSXStyle();
		st5.border = {
			left: [],
			right: ['thin', 'rgb="FF000000"'],
			top: [],
			bottom: [],
			diagonal: []
		};
		st5.alignment.wrapText = true;
		let st6 = new XLSXStyle();
		st6.border = {
			left: ['thin', 'rgb="FF000000"'],
			right: [],
			top: [],
			bottom: ['thin', 'rgb="FF000000"'],
			diagonal: []
		};
		st6.alignment.wrapText = true;
		let st7 = new XLSXStyle();
		st7.border = {
			left: [],
			right: [],
			top: [],
			bottom: ['thin', 'rgb="FF000000"'],
			diagonal: []
		};
		st7.alignment.wrapText = true;
		let st8 = new XLSXStyle();
		st8.border = {
			left: [],
			right: ['thin', 'rgb="FF000000"'],
			top: [],
			bottom: ['thin', 'rgb="FF000000"'],
			diagonal: []
		};
		st8.alignment.wrapText = true;
		let st9 = new XLSXStyle();
		st9.border = {
			left: ['thin', 'rgb="FF000000"'],
			right: [],
			top: ['thin', 'rgb="FF000000"'],
			bottom: ['thin', 'rgb="FF000000"'],
			diagonal: []
		};
		st9.alignment.wrapText = true;
		let st10 = new XLSXStyle();
		st10.border = {
			left: [],
			right: [],
			top: ['thin', 'rgb="FF000000"'],
			bottom: ['thin', 'rgb="FF000000"'],
			diagonal: []
		};
		st10.alignment.wrapText = true;
		let st11 = new XLSXStyle();
		st11.border = {
			left: [],
			right: ['thin', 'rgb="FF000000"'],
			top: ['thin', 'rgb="FF000000"'],
			bottom: ['thin', 'rgb="FF000000"'],
			diagonal: []
		};
		let st12 = new XLSXStyle();
		st12.border = {
			left: ['thin', 'rgb="FF000000"'],
			right: ['thin', 'rgb="FF000000"'],
			top: ['thin', 'rgb="FF000000"'],
			bottom: [],
			diagonal: []
		};
		let st13 = new XLSXStyle();
		st13.border = {
			left: ['thin', 'rgb="FF000000"'],
			right: ['thin', 'rgb="FF000000"'],
			top: [],
			bottom: [],
			diagonal: []
		};
		let st14 = new XLSXStyle();
		st14.border = {
			left: ['thin', 'rgb="FF000000"'],
			right: ['thin', 'rgb="FF000000"'],
			top: [],
			bottom: ['thin', 'rgb="FF000000"'],
			diagonal: []
		};
		st11.alignment.wrapText = true;
		return [st0, st1, st2, st3, st4, st5, st6, st7, st8, st9, st10, st11, st12, st13, st14];
	}

	static createStyleNumberTable(){
		let st0 = new XLSXStyle();
		st0.border = {
			left: ['thin', 'rgb="FF000000"'],
			right: ['thin', 'rgb="FF000000"'],
			top: ['thin', 'rgb="FF000000"'],
			bottom: ['thin', 'rgb="FF000000"'],
			diagonal: []
		};
		st0.numFmtId = 164;
		st0.alignment.wrapText = true;
		let st1 = new XLSXStyle();
		st1.border = {
			left: ['thin', 'rgb="FF000000"'],
			right: [],
			top: ['thin', 'rgb="FF000000"'],
			bottom: [],
			diagonal: []
		};
		st1.alignment.wrapText = true;
		st1.numFmtId = 164;
		let st2 = new XLSXStyle();
		st2.border = {
			left: [],
			right: [],
			top: ['thin', 'rgb="FF000000"'],
			bottom: [],
			diagonal: []
		};
		st2.alignment.wrapText = true;
		st2.numFmtId = 164;
		let st3 = new XLSXStyle();
		st3.border = {
			left: ['thin', 'rgb="FF000000"'],
			right: ['thin', 'rgb="FF000000"'],
			top: [],
			bottom: [],
			diagonal: []
		};
		st3.alignment.wrapText = true;
		st3.numFmtId = 164;
		let st4 = new XLSXStyle();
		st4.border = {
			left: ['thin', 'rgb="FF000000"'],
			right: [],
			top: [],
			bottom: [],
			diagonal: []
		};
		st4.alignment.wrapText = true;
		st4.numFmtId = 164;
		let st5 = new XLSXStyle();
		st5.border = {
			left: [],
			right: ['thin', 'rgb="FF000000"'],
			top: [],
			bottom: [],
			diagonal: []
		};
		st5.alignment.wrapText = true;
		st5.numFmtId = 164;
		let st6 = new XLSXStyle();
		st6.border = {
			left: ['thin', 'rgb="FF000000"'],
			right: [],
			top: [],
			bottom: ['thin', 'rgb="FF000000"'],
			diagonal: []
		};
		st6.alignment.wrapText = true;
		st6.numFmtId = 164;
		let st7 = new XLSXStyle();
		st7.border = {
			left: [],
			right: [],
			top: [],
			bottom: ['thin', 'rgb="FF000000"'],
			diagonal: []
		};
		st7.alignment.wrapText = true;
		st7.numFmtId = 164;
		let st8 = new XLSXStyle();
		st8.border = {
			left: [],
			right: ['thin', 'rgb="FF000000"'],
			top: [],
			bottom: ['thin', 'rgb="FF000000"'],
			diagonal: []
		};
		st8.alignment.wrapText = true;
		st8.numFmtId = 164;
		let st9 = new XLSXStyle();
		st9.border = {
			left: ['thin', 'rgb="FF000000"'],
			right: [],
			top: ['thin', 'rgb="FF000000"'],
			bottom: ['thin', 'rgb="FF000000"'],
			diagonal: []
		};
		st9.alignment.wrapText = true;
		st9.numFmtId = 164;
		let st10 = new XLSXStyle();
		st10.border = {
			left: [],
			right: [],
			top: ['thin', 'rgb="FF000000"'],
			bottom: ['thin', 'rgb="FF000000"'],
			diagonal: []
		};
		st10.alignment.wrapText = true;
		st10.numFmtId = 164;
		let st11 = new XLSXStyle();
		st11.border = {
			left: [],
			right: ['thin', 'rgb="FF000000"'],
			top: ['thin', 'rgb="FF000000"'],
			bottom: ['thin', 'rgb="FF000000"'],
			diagonal: []
		};
		st11.numFmtId = 164;
		let st12 = new XLSXStyle();
		st12.border = {
			left: ['thin', 'rgb="FF000000"'],
			right: ['thin', 'rgb="FF000000"'],
			top: ['thin', 'rgb="FF000000"'],
			bottom: [],
			diagonal: []
		};
		st12.numFmtId = 164;
		let st13 = new XLSXStyle();
		st13.border = {
			left: ['thin', 'rgb="FF000000"'],
			right: ['thin', 'rgb="FF000000"'],
			top: [],
			bottom: [],
			diagonal: []
		};
		st13.numFmtId = 164;
		let st14 = new XLSXStyle();
		st14.border = {
			left: ['thin', 'rgb="FF000000"'],
			right: ['thin', 'rgb="FF000000"'],
			top: [],
			bottom: ['thin', 'rgb="FF000000"'],
			diagonal: []
		};
		st14.numFmtId = 164;
		st11.alignment.wrapText = true;
		return [st0, st1, st2, st3, st4, st5, st6, st7, st8, st9, st10, st11, st12, st13, st14];
	}
}

class XLSXStyle{
	font = {
		sz: 11,
		color: 'FF000000',
		name: 'Calibri',
		tags: []
	}
	border = {
		left: [],
		right: [],
		top: [],
		bottom: [],
		diagonal: []
	}
	fill = {
		patternType: 'none'
	}
	alignment = {
		horizontal: null,
		vertical: null,
		wrapText: null
	}
	number: Number;
	numFmtId: Number;
	constructor(number = 0, numFmtId = 0){
		this.number = number;
		this.numFmtId = numFmtId;
	}
	
	getXMLFont(){
		let xml = '<font>';
		xml += '<sz val="'+this.font.sz+'"/>';
		xml += '<color rgb="'+this.font.color+'"/>';
		xml += '<name val="'+this.font.name+'"/>';
		xml += '<scheme val="minor"/>';
		this.font.tags.forEach(tag => {
			xml += '<'+tag+' />';
		});
		xml += '</font>';
		return xml;
	}
	
	getXMLBorder(){
		let xml = '<border>';
		if(this.border.left.length == 0){
			xml += '<left />';
		}else{
			xml += '<left style="'+this.border.left[0]+'">';
			xml += '<color '+this.border.left[1]+'/>';
			xml += '</left>';
		}
		if(this.border.right.length == 0){
			xml += '<right />';
		}else{
			xml += '<right style="'+this.border.right[0]+'">';
			xml += '<color '+this.border.right[1]+'/>';
			xml += '</right>';
		}
		if(this.border.top.length == 0){
			xml += '<top />';
		}else{
			xml += '<top style="'+this.border.top[0]+'">';
			xml += '<color '+this.border.top[1]+'/>';
			xml += '</top>';
		}
		if(this.border.bottom.length == 0){
			xml += '<bottom />';
		}else{
			xml += '<bottom style="'+this.border.bottom[0]+'">';
			xml += '<color '+this.border.bottom[1]+'/>';
			xml += '</bottom>';
		}
		if(this.border.diagonal.length == 0){
			xml += '<diagonal />';
		}else{
			xml += '<diagonal style="'+this.border.diagonal[0]+'">';
			xml += '<color '+this.border.diagonal[1]+'/>';
			xml += '</diagonal>';
		}
		xml += '</border>';
		return xml;
	}
	
	getXMLFill(){
		let xml = '';
	}
	
	getNumber(){
		return this.number;
	}
	
	isTrueAlignment(){
		return this.alignment.horizontal !== null || this.alignment.vertical !== null || this.alignment.wrapText !== null;
	}
	
	addTag(tag){
		this.font.tags.push(tag);
	}

	getHashFont(){
		let str = this.font.sz + 'px;';
		str += this.font.color + 'rgb;';
		str += this.font.name + 'fa;';
		this.font.tags.forEach(tag => {str += tag + 'tag;'});
		return cyrb53(str);
	}

	getHashBorder(): number {
		let str = this.border.top[0] + 'st;';
		str += this.border.top[1] + 'color;';
		str += this.border.left[0] + 'st;';
		str += this.border.left[1] + 'color;';
		str += this.border.right[0] + 'st;';
		str += this.border.right[1] + 'color;';
		str += this.border.bottom[0] + 'st;';
		str += this.border.bottom[1] + 'color;';
		str += this.border.diagonal[0] + 'st;';
		str += this.border.diagonal[1] + 'color;';
		return cyrb53(str);
	}

	getHashFill(){
		let str = this.fill.patternType + 'types;';
		return cyrb53(str);
	}

	getHash(){
		let str = this.font.sz + 'px;';
		str += this.font.color + 'rgb;';
		str += this.font.name + 'fa;';
		this.font.tags.forEach(tag => {str += tag + 'tag;'});
		str += this.border.top[0] + 'st;';
		str += this.border.top[1] + 'color;';
		str += this.border.left[0] + 'st;';
		str += this.border.left[1] + 'color;';
		str += this.border.right[0] + 'st;';
		str += this.border.right[1] + 'color;';
		str += this.border.bottom[0] + 'st;';
		str += this.border.bottom[1] + 'color;';
		str += this.border.diagonal[0] + 'st;';
		str += this.border.diagonal[1] + 'color;';
		str += this.fill.patternType + 'types;';
		str += this.numFmtId + 'num;';
		let hor = this.alignment.horizontal !== null? this.alignment.horizontal : 'null';
		str += hor + 'hor;';
		let ver = this.alignment.vertical !== null? this.alignment.vertical : 'null';
		str += ver + 'ver;';
		let wra = this.alignment.wrapText !== null? this.alignment.wrapText : 'null';
		str += wra + 'wra;';
		return cyrb53(str);
	}
}

class WorkBook{
	sheet: Array<Sheet> = [];
	nameSheet: Array<String> = [];
	styleList: Array<XLSXStyle> = [new XLSXStyle(1), new XLSXStyle(1, 164)]
	nextStyle: number = 2;
	author: string = 'Uni';
	constructor(author = 'Uni'){
		this.author = author;
	}
	
	createSheet(name){
		this.sheet.push(new Sheet(name));
		this.nameSheet.push(name);
		return this.sheet.length-1;
	}
	
	getIndexSheet(name){
		return name.indexOf(name);
	}
	
	getNameSheet(){
		return this.nameSheet;
	}
	
	getSheet(){
		return this.sheet;
	}
	
	addRow(indexSheet, row = null){
		return this.sheet[indexSheet].addRow(row);
	}
	
	addCell(indexSheet, indexRow, data, style = null){
		if(Number.isInteger(style)) style = this.styleList[style];
		this.sheet[indexSheet].addCell(indexRow, data, style);
	}
	
	getStyleList(){
		return this.styleList;
	}
	
	getAuthor(){
		return this.author;
	}
	
	addStyle(style){
		style.number = this.nextStyle;
		this.nextStyle++;
		this.styleList.push(style);
		return style.number;
	}
}

class Sheet{
	rows = {};
	lastRow = 1;
	maxCol = 1;
	merges = [];
	autoFilter = [];
	name = "";
	customWidth: Array<number> = [];

	constructor(name){
		this.name = name;
	}
	
	getName(){
		return this.name;
	}
	
	getRows(){
		return this.rows;
	}
	
	getMerges(){
		return this.merges;
	}
	
	getMaxCol(){
		return this.maxCol;
	}
	
	getMaxRow(){
		return this.lastRow - 1;
	}
	
	addRow(row = null){
		if(row !== null) this.rows[this.lastRow] = row;
		else this.rows[this.lastRow] = new Row();
		this.lastRow++;
		return this.lastRow-1;
	}
	
	addCell(indexRow, data, style = null){
		while(typeof this.rows[indexRow] == 'undefined') this.addRow();
		this.rows[indexRow].push(new Cell(data, style));
		if(this.rows[indexRow].length > this.maxCol) this.maxCol = this.rows[indexRow].length;
	}
	
	addMerges(firstCol, firstRow, lastCol, lastRow){
		let mer = new SheetMerge(firstCol, firstRow, lastCol, lastRow);
		this.merges.push(mer);
	}

	setCustomWidth(i, k){
		this.customWidth[k] = i;
	}
}

class Row{
	cells = {};
	length = 0;
	lastCell = 1;

	constructor(){
	}
	
	push(cell){
		this.cells[this.lastCell] = cell;
		this.lastCell++;
		this.length++;
	}
	
	getSizeRow(){
		return this.length;
	}
	
	getCells(){
		return this.cells;
	}
}

class Cell{
	data = null;
	style = null;

	constructor(data = null, style = null){
		this.data = data;
		this.style = style;
	}
	
	isNumber(){
		return +this.data == this.data && !this.haveWhitespace();
	}
	
	haveWhitespace(){
		return typeof this.data === 'string' && this.data.substr(-1) != ' ';
	}

	isNull(){
		return this.data == '' || this.data === null;
	}
	
	getStyleNum(){
		if(this.style===null) return this.isNumber()? 1 : 0;
		return this.style.getNumber();
	}
	
	getData(){
		return this.data;
	}
	
	setData(data){
		if(+data == data){
			this.data = +data;
		}else{
			this.data = data;
		}
	}
	
	setStyle(style){
		this.style = style;
	}
}

class SheetMerge{
	data: Array<number>;
	constructor(firstCol, firstRow, lastCol, lastRow){
		this.data = [firstCol, firstRow, lastCol, lastRow];
	}
	
	getFirst(){
		return [this.data[0], this.data[1]];
	}
	
	getLast(){
		return [this.data[2], this.data[3]];
	}
	
	getMerge(){
		return numberToABC(this.data[0])+this.data[1]+':'+numberToABC(this.data[2])+this.data[3];
	}
}

class RenderXLXS {
	sharedString: Array<string> = new Array();
	styleHash: Array<number> = new Array();
	createXMLApp(nameSheet){
		let file = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>XLSX-Uni</Application><DocSecurity>0</DocSecurity>`;
		//<HeadingPairs>
		file += `<HeadingPairs><vt:vector size="2" baseType="variant"><vt:variant><vt:lpstr>Лист</vt:lpstr></vt:variant><vt:variant><vt:i4>`+nameSheet.length+`</vt:i4></vt:variant></vt:vector></HeadingPairs>`;
		//<TitlesOfParts>
		file += '<TitlesOfParts><vt:vector size="'+nameSheet.length+'" baseType="lpstr">';
		nameSheet.forEach(name => {
			file += '<vt:lpstr>'+name+'</vt:lpstr>';
		});
		file += `</vt:vector></TitlesOfParts>`;
		//End
		file += '</Properties>';
		
		return file;
	}
	
	createXMLCore(creator){
		let file = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">`;
		file += '<dc:creator>' + creator + '</dc:creator>';
		file += '<dcterms:created xsi:types="dcterms:W3CDTF">' + getDateW3CDTF() + '</dcterms:created>';
		file += '</cp:coreProperties>';
		return file;
	}
	
	createXMLShell(sheet: Sheet, styleList: Array<XLSXStyle>){
		let rows = sheet.getRows();
		let file = `<?xml version="1.0" encoding="UTF-8"?>\n<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:etc="http://www.wps.cn/officeDocument/2017/etCustomData" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:x14="http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing">`;
		file += '<dimension ref="A1:'+numberToABC(sheet.getMaxCol())+sheet.getMaxRow()+'" />';
		file += `<sheetViews><sheetView tabSelected="1" workbookViewId="0"><selection activeCell="A1" sqref="A1" /></sheetView></sheetViews><sheetFormatPr defaultColWidth="9" defaultRowHeight="20" outlineLevelCol="6" />`;
		if(sheet.customWidth.length > 0){
			file += `<cols>`;
			sheet.customWidth.forEach((i, k) => {
				if(typeof i !== 'undefined') file += `<col min="` + (k) + `" max="` + (k) + `" width="` + i + `" customWidth="1" />`;
			});
			file += `</cols>`;
		}
		file += `<sheetData>`;
		let numStr = 0;
		Object.keys(rows).forEach((i) => {
			let row = rows[i];
			let span = i+Number.parseInt(row.getSizeRow());
			file += '<row r="'+i+'" spans="'+i+':'+span+'">';
			let cells = row.getCells();
			Object.keys(cells).forEach((j0) => {
				let j = Number.parseInt(j0);
				let cell = cells[j];
				if(typeof cell.getData() === 'number'){
					file += '<c r="'+numberToABC(j)+i+'" s="'+this.styleHash.indexOf(styleList[cell.getStyleNum()].getHash())+'"><v>'+cell.getData()+'</v></c>';
				}else if(cell.isNull()){
					file += '<c r="'+numberToABC(j)+i+'" s="'+this.styleHash.indexOf(styleList[cell.getStyleNum()].getHash())+'" />';
				}else{
					file += '<c r="'+numberToABC(j)+i+'" s="'+this.styleHash.indexOf(styleList[cell.getStyleNum()].getHash())+'" t="s"><v>'+numStr+'</v></c>';
					this.sharedString.push(cell.getData());
					numStr++;
				}
			});
			file += '</row>';
		});
		file += '</sheetData>';
		let merges = sheet.getMerges()
		if(merges.length > 0){
			file += '<mergeCells count="'+merges.length+'">';
			merges.forEach( (merge) => {
				file += '<mergeCell ref="'+merge.getMerge()+'" />';
			});
			file += '</mergeCells>';
		}
		file += '<headerFooter /></worksheet>';

		return file;
	}
	
	createXMLSharedStrings(){
		let file = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="9" uniqueCount="9">`;
		this.sharedString.forEach((str)=>{
			file += '<si><t>'+str+'</t></si>';
		});
		file += '</sst>';
		return file;
	}
	
	createXMLWorkBook(nameSheet){
		let file = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><fileVersion appName="xl" lastEdited="3" lowestEdited="0" rupBuild="9302"/><workbookPr/>`;
		file += '<bookViews><workbookView windowHeight="17715"  /></bookViews>';
		file += '<sheets>';
		nameSheet.forEach((name, i) => {
			const id = i+1;
			file += '<sheet name="'+name+'" sheetId="'+id+'" r:id="rId'+id+'"/>';
		});
		file += '</sheets>';
		file += '<calcPr calcId="0" />';
		file += '</workbook>';
		return file;
	}
	
	createXMLContentTypes(countSheet){
		let file = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>`;
		file += '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>';
		file += '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>';
		file += '<Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>';
		file += '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>';
		file += '<Override PartName="/xl/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>';
		file += '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>';
		for(let i=1;i<=countSheet;i++)
			file += '<Override PartName="/xl/worksheets/sheet'+i+'.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>';
		file += '</Types>';
		return file;
	}
	
	createXMLRelsWorkBook(countSheet){
		let file = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId5" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/><Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/>`;
		for(let i = 1;i<=countSheet;i++){
			file+='<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet'+i+'.xml"/>';
		}
		file += '</Relationships>';
		return file;
	}
	
	returnRelsMain(){
		return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>`;
	}
	
	createStyle(styleList: Array<XLSXStyle>){
		let file = `<?xml version="1.0" encoding="UTF-8"?>\n<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><numFmts count="1"><numFmt numFmtId="180" formatCode="0.000000" /></numFmts>`;
		let fontStr: string = '';
		let fontLen: number = 0;
		let fontHas: Array<number> = [];
		styleList.forEach((item: XLSXStyle) => {
			if(fontHas.indexOf(item.getHashFont()) === -1){
				fontStr += item.getXMLFont();
				fontLen++;
				fontHas.push(item.getHashFont());
			}
		});
		file += '<fonts count="'+fontLen+'">' + fontStr + '</fonts>';
		//
		file += '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>';
		//
		let borStr: string = '';
		let borLen: number = 0;
		let borHas: Array<number> = [];
		styleList.forEach((item: XLSXStyle) => {
			if(borHas.indexOf(item.getHashBorder()) === -1){
				borStr += item.getXMLBorder();
				borLen++;
				borHas.push(item.getHashBorder());
			}
		});
		file += '<borders count="'+borLen+'">' + borStr + '</borders>';
		file += '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" /></cellStyleXfs>';

		let fontXfStr: string = '';
		let fontXfLen: number = 0;
		let fontXfHas: Array<number> = [];
		styleList.forEach((item, i) => {
			if(fontXfHas.indexOf(item.getHash()) === -1){
				//let num = item.numFmtId == 164? 49 : 0;
				let num = 0;
				fontXfStr += '<xf numFmtId="'+num+'" fontId="'+(fontHas.indexOf(item.getHashFont()))+'" fillId="0" borderId="'+(borHas.indexOf(item.getHashBorder()))+'" xfId="0" applyFont="1" applyFill="1" applyBorder="1" ';
				if(item.isTrueAlignment()){
					fontXfStr += 'applyAlignment="1"><alignment ';
					if(item.alignment.horizontal !== null) fontXfStr += 'horizontal="'+item.alignment.horizontal+'" ';
					if(item.alignment.vertical !== null) fontXfStr += 'vertical="'+item.alignment.vertical+'" ';
					if(item.alignment.wrapText !== null) fontXfStr += 'wrapText="1" ';
					fontXfStr += '/>';
				}else{
					fontXfStr += '>';
				}
				fontXfStr += '</xf>';
				fontXfLen++;
				fontXfHas.push(item.getHash());
			}
		});
		file += '<cellXfs count="'+fontXfLen+'">' + fontXfStr + '</cellXfs>';
		this.styleHash = fontXfHas;
		file += '<cellStyles count="1"><cellStyle name="Обычный" xfId="0" builtinId="0" /></cellStyles><dxfs count="0" />';
		file += '</styleSheet>';
		return file;
	}
	
	returnThemeOne(){
		return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office"><a:themeElements><a:clrScheme name="Office"><a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1><a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="44546A"/></a:dk2><a:lt2><a:srgbClr val="E7E6E6"/></a:lt2><a:accent1><a:srgbClr val="5B9BD5"/></a:accent1><a:accent2><a:srgbClr val="ED7D31"/></a:accent2><a:accent3><a:srgbClr val="A5A5A5"/></a:accent3><a:accent4><a:srgbClr val="FFC000"/></a:accent4><a:accent5><a:srgbClr val="4472C4"/></a:accent5><a:accent6><a:srgbClr val="70AD47"/></a:accent6><a:hlink><a:srgbClr val="0563C1"/></a:hlink><a:folHlink><a:srgbClr val="954F72"/></a:folHlink></a:clrScheme><a:fontScheme name="Office"><a:majorFont><a:latin typeface="Calibri Light"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/><a:font script="Hang" typeface="맑은 고딕"/><a:font script="Hans" typeface="宋体"/><a:font script="Hant" typeface="新細明體"/><a:font script="Arab" typeface="Times New Roman"/><a:font script="Hebr" typeface="Times New Roman"/><a:font script="Thai" typeface="Tahoma"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="MoolBoran"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Times New Roman"/><a:font script="Uigh" typeface="Microsoft Uighur"/><a:font script="Geor" typeface="Sylfaen"/></a:majorFont><a:minorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/><a:font script="Hang" typeface="맑은 고딕"/><a:font script="Hans" typeface="宋体"/><a:font script="Hant" typeface="新細明體"/><a:font script="Arab" typeface="Arial"/><a:font script="Hebr" typeface="Arial"/><a:font script="Thai" typeface="Tahoma"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="DaunPenh"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Arial"/><a:font script="Uigh" typeface="Microsoft Uighur"/><a:font script="Geor" typeface="Sylfaen"/></a:minorFont></a:fontScheme><a:fmtScheme name="Office"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:lumMod val="110000"/><a:satMod val="105000"/><a:tint val="67000"/></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:lumMod val="105000"/><a:satMod val="103000"/><a:tint val="73000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:lumMod val="105000"/><a:satMod val="109000"/><a:tint val="81000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0"/></a:gradFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:satMod val="103000"/><a:lumMod val="102000"/><a:tint val="94000"/></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:satMod val="110000"/><a:lumMod val="100000"/><a:shade val="100000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:lumMod val="99000"/><a:satMod val="120000"/><a:shade val="78000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0"/></a:gradFill></a:fillStyleLst><a:lnStyleLst><a:ln w="6350" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/><a:miter lim="800000"/></a:ln><a:ln w="12700" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/><a:miter lim="800000"/></a:ln><a:ln w="19050" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/><a:miter lim="800000"/></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst><a:outerShdw blurRad="57150" dist="19050" dir="5400000" algn="ctr" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="63000"/></a:srgbClr></a:outerShdw></a:effectLst></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"><a:tint val="95000"/><a:satMod val="170000"/></a:schemeClr></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="93000"/><a:satMod val="150000"/><a:shade val="98000"/><a:lumMod val="102000"/></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:tint val="98000"/><a:satMod val="130000"/><a:shade val="90000"/><a:lumMod val="103000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="63000"/><a:satMod val="120000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0"/></a:gradFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements><a:objectDefaults/></a:theme>`;
	}

	download(data, name){
		let a = document.createElement("a");
		var byteCharacters = atob(data);
		var byteArrays = [];

		for (var offset = 0; offset < byteCharacters.length; offset += 512) {
			var slice = byteCharacters.slice(offset, offset + 512);

			var byteNumbers = new Array(slice.length);
			for (var i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}
		
			var byteArray = new Uint8Array(byteNumbers);
		
			byteArrays.push(byteArray);
		}
	
		var file = new Blob(byteArrays, {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
		let url = URL.createObjectURL(file);
		a.href = url;
		a.download = name;
		document.body.appendChild(a);
		a.click();
		setTimeout(function () {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		}, 0);
	}
	
	constructor(workbook, name = "file.xlsx"){
		this.sharedString = [];

		let zip = new TSZip();
		zip.file("[Content_Types].xml", this.createXMLContentTypes(workbook.getSheet().length));
		zip.folder("_rels");
		zip.file("_rels/.rels", this.returnRelsMain());
		zip.folder("docProps");
		zip.file("docProps/app.xml", this.createXMLApp(workbook.getNameSheet()));
		zip.file("docProps/core.xml", this.createXMLCore(workbook.getAuthor()));
		zip.folder("xl");
		zip.file("xl/workbook.xml", this.createXMLWorkBook(workbook.getNameSheet()));
		zip.file("xl/styles.xml", this.createStyle(workbook.getStyleList()));
		zip.folder("xl/worksheets");
		workbook.getSheet().forEach((sheet,i)=>{
			zip.file("xl/worksheets/sheet"+(i+1)+".xml", this.createXMLShell(sheet, workbook.getStyleList()));
		});
		zip.file("xl/sharedStrings.xml", this.createXMLSharedStrings());
		zip.folder("xl/_rels");
		zip.file("xl/_rels/workbook.xml.rels", this.createXMLRelsWorkBook(workbook.getSheet().length));
		zip.folder("xl/theme");
		zip.file("xl/theme/theme1.xml", this.returnThemeOne());
		var content = zip.generate({type:"base64"});
		this.download(content, name);
	}

	
}
	
function getDateW3CDTF(){
	const d = new Date();
	const year = d.getUTCFullYear();
	const month = d.getUTCMonth() + 1;
	const day = d.getUTCDate();
	const hours = d.getUTCHours();
	const minutes = d.getUTCMinutes();
	const seconds = d.getUTCSeconds();
	
	return year + '-' +
			(month > 9? month : '0' + month) + '-' +
			(day > 9? day : '0' + day) + 'T' +
			(hours > 9 ? hours : '0' + hours) + ':' +
			(minutes > 9? minutes : '0' + minutes) + ':' +
			(seconds > 9? seconds : '0' + seconds) + 'Z';
}

function numberToABC(number: number){
	const abc = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	if (number <= 26) return abc[number-1];
	let str = '';
	while (number > 0){
		let nppStr = (number%26) - 1;
		str += abc[nppStr >= 0? nppStr : 25];
		number = Number.parseInt((number/26).toString());
	}
	return str.split("").reverse().join("");
}

function cyrb53(str, seed = 0):number {
	let h1 = 0xdeadbeef ^ seed,
	  h2 = 0x41c6ce57 ^ seed;
	for (let i = 0, ch; i < str.length; i++) {
	  ch = str.charCodeAt(i);
	  h1 = Math.imul(h1 ^ ch, 2654435761);
	  h2 = Math.imul(h2 ^ ch, 1597334677);
	}
	
	h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
	h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
	
	return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  };
