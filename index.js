var express = require('express'),
	request = require('request'),
	cheerio = require('cheerio'),
	app = express();
 
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views' , './views');
app.listen(3003, function (req, res) {
	// body...
	console.log('Server is running on port 3003');

});
var arr = [] ;
var arr1 = [] ;
var arr2 = [] ;
var arr3 = [];
app.get('/', function(req, res){


	for (let i = 556; i < 570; i ++){
		request("http://online.gov.vn/WebsiteDisplay.aspx?DocId=" + i , function (err, response, body) {
			if(err){
				console.log(err);
			} else{
				$ = cheerio.load(body);
				if(body.indexOf("reg-subtitle") == -1){
					console.log(i ,"Khong ton tai");
					
				}
				else {
					//Tên doanh nghiệp
					let companyName = $(body).find("#ctl00_ContentPlaceHolder1_lblCompanyName");
					var companyNameText;
					companyName.each(function(i, e){
						companyNameText = $(this).text();
					});
					arr.push(companyNameText);
					
					//MST/ĐKKD/QĐTL
					let companyTaxCode = $(body).find("#ctl00_ContentPlaceHolder1_lblCompanyTaxCode");
					var companyTaxCodeText;
					companyTaxCode.each(function(i, e){
						companyTaxCodeText = $(this).text();
					});
					arr1.push(companyTaxCodeText);
					
					//Tỉnh/thành phố
					let departmentName = $(body).find("#ctl00_ContentPlaceHolder1_lblDepartmentName");
					var departmentNameText;
					departmentName.each(function(i, e){
						departmentNameText = $(this).text();
					});
					arr2.push(departmentNameText);

					
					//Điện thoại
					let companyPhone = $(body).find("#ctl00_ContentPlaceHolder1_lblCompanyPhone");
					var companyPhoneText;
					companyPhone.each(function(i, e){
						companyPhoneText = $(this).text();
					});
					arr3.push(companyPhoneText);
					//arr2.push("-------------------------------");
				//console.log(arr);
				//	console.log(i, $('#ctl00_ContentPlaceHolder1_lblName').text());
					
				}
			}

		});
	}
	res.render('index', {arr,arr1, arr2, arr3: arr, arr1, arr2, arr3})
});

