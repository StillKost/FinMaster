﻿$(document).ready(function (argument) {

	var table = $('#main');
	var table2 = $('#main2');
	var number1 = 1;
	var number2 = 1;

	$("body").on('click', '#addrecord', function(){
		var rowTemplate = '<tr class="record"><td class="number1">'+number1+'</td><td><input type="text" readonly="readonly" class="form-control index_name"></td><td><input type="number1" readonly="readonly" class="form-control base"></td><td><input type="number1" readonly="readonly" class="form-control report"></td><td class="changes"></td><td class="base_weight"></td><td class="report_weight"></td><td class="changes_percent"></td><td class="control"><span class="btn btn-danger dropRow">X</span></td></tr>';
		$(table).append(rowTemplate);
		number1++;
	});

	$("body").on('click', '#addrecord2', function(){
		var rowTemplate = '<tr class="record"><td class="number1">'+number2+'</td><td><input type="text" readonly="readonly" class="form-control index_name"></td><td><input type="number" readonly="readonly" class="form-control base_sum"></td><td class="base_percent"></td><td><input type="number" readonly="readonly" class="form-control report_sum"></td><td class="report_percent"></td><td class="control"><span class="btn btn-danger dropRow2">X</span></td></tr>';
		$(table2).append(rowTemplate);
		number2++;
	});

	function GetTableData(type) {


		switch(type){
			case "horisontal":
				var data = [];
				var rows = $('#main').find('tr.record');
				for(var i = 0; i < rows.length; i++){
					var record = {};
					var cells = $(rows[i]).find('td');

					var index = parseFloat($(rows[i]).find('td.number1').html());

					var name = $(cells[1]).find('input.index_name').val();
					var base = $(cells[2]).find('input.base').val();
					var report = $(cells[3]).find('input.report').val();

					base = !base ? 0 : base;
					report = !report ? 0 : report;			

					record.index = index;
					record.name = name;
					record.base = base;
					record.report = report;
					data.push(record);
				}
				if (!data.length) {
					return 0;
				}
				console.log(data);
				return data;
			break;
			case "vertical":
				var data = [];
				var rows = $('#main2').find('tr.record');
				for(var i = 0; i < rows.length; i++){
					var record = {};
					var cells = $(rows[i]).find('td');

					var index = parseFloat($(rows[i]).find('td.number1').html());

					var name = $(cells[1]).find('input.index_name').val();
					var base = $(cells[2]).find('input.base').val();
					var report = $(cells[3]).find('input.report').val();

					base = !base ? 0 : base;
					report = !report ? 0 : report;			

					record.index = index;
					record.name = name;
					record.base = base;
					record.report = report;
					data.push(record);
				}
				if (!data.length) {
					return 0;
				}
				console.log(data);
				return data;
			break;		}
		
	}

	function Calculate() {
		var data = GetTableData("horisontal");

		if (data == 0) return data;

		var staticProfit = parseFloat(data[0].base);
		for(var i = 0; i < data.length; i++){
			data[i].base = parseFloat(data[i].base);
			data[i].report = parseFloat(data[i].report);
			data[i].changes = data[i].report - data[i].base;			
			data[i].base_weight = InPercents(data[i].base, data[i].base);
			data[i].report_weight = InPercents(data[i].report, data[i].base);
			data[i].changes_percent = InPercents(data[i].changes, staticProfit);
		}

		return data;
	}




	function ShowResultsHorisontal() {

		var isEmpty = $('#main').find('tr.record').length > 0 ? false : true;
		if (isEmpty) {
			alert('Таблица не заполнена!');
			return;
		}

		var data = Calculate();
		if (data == 0) {
			alert('Таблица не заполнена!');
		}

		var rows = $('#main').find('tr.record');

		for(var i = 0; i < data.length; i++){
			var cells = $(rows[i]).find('td');
			for(var j = 0; j < cells.length; j++){
				var indexType = $(cells[j]).attr('class');

				switch(indexType){
					case "changes":
						$(cells[j]).html(data[i].changes)
					break;
					case "base_weight":
						$(cells[j]).html(data[i].base_weight)
					break;
					case "report_weight":
					$	(cells[j]).html(data[i].report_weight)
					break;
					case "changes_percent":
						$(cells[j]).html(data[i].changes_percent + " %")
					break;
				}
			}
		}
		return data;
	}

	function InPercents(a, b) {
		b = b == 0 ? 1 : b;
		var res = (a / b) * 100;
		res = Math.round(res * 100) / 100;
		return res;
	}

	$("body").on('click', '#TEST', function(){
		var res = ShowResultsHorisontal();
		console.log(res);
	});

	$("body").on('click', '#calculate', function(){
		var res = ShowResultsHorisontal();
	});

	$("body").on('click', '.dropRow', function(){
		//remove row
		var row = $(this).closest('tr');
		var index = parseFloat($(row).find('td.number1').html());
		$(row).remove();
		//updete indexes
		var indexes = $('#main').find('td.number1');
		for(var i = 0; i < indexes.length; i++){
			$(indexes[i]).html(i+1);
		}
		var rows = $('#main').find('tr.record')
		var isEmpty = rows.length > 0 ? false : true;
		if(isEmpty){
			number1 = 1;
		} else {
			number1 = parseFloat($(rows[rows.length-1]).find('td.number1').html()) + 1;
		}
	});

	$("body").on('click', '.dropRow2', function(){
		//remove row
		var row = $(this).closest('tr');
		var index = parseFloat($(row).find('td.number1').html());
		$(row).remove();
		//updete indexes
		var indexes = $('#main2').find('td.number1');
		for(var i = 0; i < indexes.length; i++){
			$(indexes[i]).html(i+1);
		}
		var rows = $('#main2').find('tr.record')
		var isEmpty = rows.length > 0 ? false : true;
		if(isEmpty){
			number2 = 1;
		} else {
			number2 = parseFloat($(rows[rows.length-1]).find('td.number1').html()) + 1;
		}
	});

	$("body").on('blur', 'input.form-control', function(){
		$(this).attr('readonly','readonly');
	});

	$("body").on('click', 'input.form-control', function(){
		$(this).removeAttr('readonly');
	});

});