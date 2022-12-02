// import showAlert from './alert.js'

// $('#previous_day').click(function (e) {

//   setDate(-1);
// });
// $('#next_day').click(function (e) {

//   setDate(1);
// });

// function setDate(diff) {

//   var newDate = new Date(day);
//   newDate.setDate(day.getDate() + diff);
//   day = newDate;
//   $('#selected-date').text(newDate.toLocaleDateString('en-GB'));

//   let id_sensor = $('.sensor_active').attr('id');
//   load_data_sensor(id_sensor, $('#selected-date').text());
// }

// $('#confirmSchedule').click(function () {
//   var path = location.pathname.split("/")
//   if (path[2] == "") {
//     // var house_id = $("#house_id").text()
//     path[2] = "sensorName"
//   }
//   var url = "/home/chart/" + path[2]
//   var data = {}
//   var time;
//   data['fromDate'] = $('#fromDate').val();
//   data['toDate'] = $('#toDate').val();
//   time = data['fromDate']
//   if ((data['fromDate'] == '') || (data['toDate'] == '')) {
//     showAlert("Lựa chọn thiếu thông tin thời gian. Vui lòng kiểm tra lại!", "", "danger")
//   }
//   else if (data['toDate'] <= data['fromDate']) {
//     showAlert("Khoảng thời gian không phù hợp. Vui lòng kiểm tra lại !", "", "danger")
//   }
//   else {
//     $.ajax({
//       type: "POST",
//       url: url,
//       contentType: "application/json;charset=utf-8",
//       data: JSON.stringify(data),
//       dataType: 'json',
//       success: function (response) {
//         $('#selectSchedule').modal('hide');
//         $('#chart').empty();
//         var listdata = []
//         var data_len = 0;
//         for (let i = 0; i < response['sensor_count']; i++) {
//           data = []
//           for (let j = 0; j < response['value'][i].length; j++) {
//             data.push({ x: response['time'][i][j], y: response['value'][i][j] })
//           }
//           listdata.push(data)
//           data_len += listdata[i].length;
//         }

//         var listseries = []
//         for (let i = 0; i < response['sensor_count']; i++) {
//           listseries[i] = {
//             name: response['sensor_name'][i],
//             data: listdata[i]
//           }
//         }

//         if (data_len == 0) {
//           listseries = [{
//             name: 'No data',
//             data: [{ x: new Date(time).getTime(), y: 0 }]
//           }]
//         }

//         var options = {
//           noData: {
//             text: "Không có dữ liệu",
//             align: 'center',
//             verticalAlign: 'middle',
//             style: {
//               color: '#d9d9d9',
//               fontSize: '30px',
//             }
//           },
//           series: listseries,
//           chart: {
//             toolbar: {
//               show: true,
//               offsetX: 0,
//               offsetY: 0,
//               tools: {
//                 download: true,
//                 selection: true,
//                 zoom: true,
//                 zoomin: true,
//                 zoomout: true,
//                 pan: true,
//                 reset: true,
//                 customIcons: [
//                   {
//                     icon: '<i class="far fa-calendar" style="margin-left: 40%;" data-bs-toggle="modal" data-bs-target="#selectSchedule"></i>',
//                     index: 4,
//                     title: 'tooltip of the icon',
//                     class: 'custom-icon',
//                     click: function (chart, options, e) {
//                     }
//                   }
//                 ]
//               },
//               export: {
//                 csv: {
//                   filename: "Dữ liệu cảm biến",
//                   columnDelimiter: ',',
//                   headerCategory: 'category',
//                   headerValue: 'value',
//                   series: [{
//                     name: "test",
//                   }],
//                 },
//                 svg: {
//                   filename: "Dữ liệu cảm biến",
//                 },
//                 png: {
//                   filename: "Dữ liệu cảm biến",
//                 }
//               },
//               autoSelected: 'zoom'
//             },
//             height: 480,
//             type: 'area',
//           },
//           dataLabels: {
//             enabled: false
//           },
//           stroke: {
//             curve: 'smooth'
//           },
//           xaxis: {
//             type: 'datetime',
//           },
//           tooltip: {
//             x: {
//               format: 'dd/MM/yy HH:mm',
//             },
//           },
//         };

//         var chart = new ApexCharts(document.querySelector("#chart"), options);
//         chart.render();
//       },
//       error: function (error) {
//         console.log(error);
//       }
//     })
//   }
// })
// var house_id = $("#house_id").text()
// var url = `http://112.137.129.232:3701/api/greenhouses/${house_id}` // API o day
// var buttons = document.getElementsByClassName("button-mode");
// var arr = [...buttons];
// arr.forEach((element, index) => {
//   element.addEventListener("click", () => {
//     element.style.opacity = "1";
//     if (index == 0) {
//       $(".mode").text("Thủ công")
//       $(".tri-state-toggle").css('background', "#ccc")
//       $.ajax({
//         url: url,
//         contentType: "application/json;charset=utf-8",
//         data: JSON.stringify({
//           mode: "0"
//         }),
//         dataType: 'json',
//         type: "PATCH",
//         success: function (response) {
//           showAlert(response.message, "Thay đổi trạng thái", "success")
//           setTimeout(function(){
//             window.location.reload();
//         }, 2000)
//         },
//         error: function (error) {
//           showAlert("Thay đổi trạng thái thất bại, vui lòng thử lại sau", "Thay đổi trạng thái", "danger")
//           setTimeout(function(){
//             window.location.reload();
//         }, 2000)
//         }
//       })
//     } else if (index == 1) {
//       $(".mode").text("Bán tự động")
//       $(".tri-state-toggle").css('background', "#dfdff8")
//       $.ajax({
//         url: url,
//         contentType: "application/json;charset=utf-8",
//         data: JSON.stringify({
//           mode: "1"
//         }),
//         dataType: 'json',
//         type: "PATCH",
//         success: function (response) {
//           showAlert(response.message, "Thay đổi trạng thái", "success")
//           setTimeout(function(){
//             window.location.reload();
//         }, 2000)
//         },
//         error: function (error) {
//           showAlert("Thay đổi trạng thái thất bại, vui lòng thử lại sau", "Thay đổi trạng thái", "danger")
//           setTimeout(function(){
//             window.location.reload();
//         }, 2000)
//         }
//       })
//     } else {
//       $(".mode").text("Tự động")
//       $(".tri-state-toggle").css('background', "#ACDFFF")
//       $.ajax({
//         url: url,
//         contentType: "application/json;charset=utf-8",
//         dataType: 'json',
//         data: JSON.stringify({
//           mode: "2"
//         }),
//         type: "PATCH",
//         success: function (response) {
//           showAlert(response.message, "Thay đổi trạng thái", "success")
//           setTimeout(function(){
//             window.location.reload();
//         }, 2000)
//         },
//         error: function (error) {
//           showAlert("Thay đổi trạng thái thất bại, vui lòng thử lại sau", "Thay đổi trạng thái", "danger")
//           setTimeout(function(){
//             window.location.reload();
//         }, 2000)
//         }
//       })
//     }
//     arr
//       .filter(function (item) {
//         return item != element;
//       })
//       .forEach((item) => {
//         item.style.opacity = "0";
//       });
//   });
// });