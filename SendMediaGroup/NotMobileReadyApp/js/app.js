 jQuery(document).ready(function(){
            jQuery('a[href^="#"]').on('click',function (e) {
                e.preventDefault();

                var target = this.hash;
                var jQuerytarget = jQuery(target);

                jQuery('html, body').stop().animate({
                    'scrollTop': jQuerytarget.offset().top
                }, 900, 'swing');
            });
        });

        function toggle(type){
            $('.this-inputs').hide();
            $('#input-'+type).fadeIn('slow');
            /*buttons*/
            $('.domain-btn').removeClass('btn-success');
            $('.domain-btn').addClass('btn-default');
            $('#'+type+'-btn').addClass('btn-success');
        }


jQuery(document).ready(function(){
            jQuery('a[href^="#"]').on('click',function (e) {
                e.preventDefault();

                var target = this.hash;
                var jQuerytarget = jQuery(target);

                jQuery('html, body').stop().animate({
                    'scrollTop': jQuerytarget.offset().top
                }, 900, 'swing');
            });
        });

        function toggle(type){
            $('.this-inputs').hide();
            $('#input-'+type).fadeIn('slow');
            /*buttons*/
            $('.domain-btn').removeClass('btn-success');
            $('.domain-btn').addClass('btn-default');
            $('#'+type+'-btn').addClass('btn-success');
        }

function check_now(domain){
        if($.trim(domain) == ''){
            return false;
        }
        /*needs to be http*/
        //var domain = $.trim($('#domain_name').val());
        var validate = validate_domain(domain);
        var loading_image = 'ajax-loader.gif';
        if(validate){
            /*clean domain*/
            domain = domain.replace('http://', '');

            /*add domain to queue*/
            add_to_queue(domain);

            var id_domain = get_domain_id(domain);

            var strVar="";
            strVar += "<div id='result-of-"+id_domain+"' class=\"col-xs-4 col-md-4\">";
            strVar += "<h3>"+domain+"<\/h3>";
            strVar += "<div id='loading-"+id_domain+"'><center>Analyzing <strong>"+domain+"</strong><br /><img src='"+loading_image+"' /></center></div>";
            strVar += "</div>";
            $('#results-content').prepend(strVar);
            read_queue();
        }
    }

    function request_data(domain){
        var id_domain = get_domain_id(domain);
        var key ='&key=AIzaSyCPFRwvYYi5ASk2g9-RMIztcYSUMo2q_Gc&';
        $('#is_active').val(1);
        $.ajax({
            url: 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?screenshot=true&strategy=mobile&url=http://'+domain+key,
            type: 'GET',
            dataType: "json",
            success: function (resp) {
                $('#loading-'+id_domain).remove();
         

                //   var enc = resp.screenshot.data.replace('_','/');
                 var str= resp.screenshot.data;
                
                
                var res= str.split('_').join('/');  
              
                localStorage.setItem("data",res);

                n = localStorage.getItem("data").split('-').join('+');
 
                console.log(n);
                //  localStorage.setItem("b-data",n);
                  
                if (resp.error != null) {
                    /*ERROR*/
                                                                                                                                                                                                                                                                    
                    var strVar="";
                    strVar += "<h3>"+domain+"<\/h3>";
                    strVar += "<div class=\"mob-demo-cont\">";
                    strVar += "<img src=\"bootstrap\/images\/mob-sample2.png\" style=\"background-image:url('images/not-mobile-f.png');background-size:contain; background-repeat: no-repeat; background-position: center;\" \/>";
                    strVar += "<div class=\"cont-screen\"><\/div>";
                    strVar += "<div class=\"passed\" style='background-color: red;'>";
                    strVar += 'Error';
                    strVar += "<\/div>";
                    strVar += "<div class=\"percent\" style='background-color: red;line-height: 1;font-size: 9px;'>";
                    strVar += resp.error.message;
                    strVar += "<\/div>";

                }else{
                    var strVar="";
     
                    strVar += "<h3>"+domain+"<\/h3>";
                    strVar += "<div class=\"mob-demo-cont\">";
                    if(resp.screenshot.data != ''){
                        
                        strVar += "<img src=\"bootstrap\/images\/mob-sample2.png\" \/>";

                    }
           

                    strVar += "<div class=\"cont-screen\">";
                    
                    strVar += "<img src=\""+'data:image/gif;base64,'+n+"\" class=\"panel-image-preview\" \/>";
                    strVar += "<\/div>";
                    if(resp.ruleGroups.USABILITY.score > 80){
                        //  console.log(n);
                        strVar += "<div class=\"passed\">";
                        strVar += "<img src=\"bootstrap\/images\/check-icon.png\" \/>";
                        strVar += "passed";
                        var export_grade = 'PASSED';
                    }else{
                        strVar += "<div class=\"passed\" style=\"background-color: red;\">";
                 
                        strVar += "failed";
                        var export_grade = 'FAILED';
                      
                        $('#not-mobile-btn').show();
                        var input_html = '<li>'+domain+'('+resp.ruleGroups.USABILITY.score+'%) <input name="domains[]" value="'+domain+'" type="hidden"></li>';
                        $('#failed-domain-list').append(input_html);
                    }

                    strVar += "<\/div>";
                    strVar += "<div class=\"percent\">";
                    strVar += resp.ruleGroups.USABILITY.score+"%";
                    strVar += "<\/div>";
                    strVar += "<a href=\"javascript: void(0);\" onclick=\"javascript: toggle_details('"+id_domain+"')\">";
                    strVar += "<div class=\"togs\">Click to Toggle Details<\/div>";
                    strVar += "<img src=\"bootstrap\/images\/down.png\" \/>";
                    strVar += "</a>";
                    strVar += "<div id='details-"+id_domain+"' class=\"togs\" style='color:white;display:none;'>";
    
                    if(resp.ruleGroups.USABILITY.pass != 1){
                        $.each(resp.formattedResults.ruleResults, function(index, val){
          
                            if(val.ruleImpact != 0){
                                strVar += '<h4 class="label-danger" style="padding: 12px;">X '+val.localizedRuleName+'</h4>';
                            }
                        })
                        strVar += '<hr />';
                    }

                    strVar += "<div style='color: black;font-size: 12px;word-wrap: break-word;'>";
 
                    if (resp.pageStats != null) {
                        $.each(resp.pageStats, function(index, val){
                            strVar += get_details(index, val);
                        })
                    }
                    strVar += "<\/div>";
                    strVar += "<\/div>";
                    strVar += "<\/div>";
                 
                    var td_html = '<tr><td>'+domain+'</td><td>'+export_grade+'</td><td>'+resp.ruleGroups.USABILITY.score+'</td></tr>'
                    $('#export-tbl tbody').prepend(td_html);
                }


                $('#result-of-'+id_domain).html(strVar);


                $('#q_'+id_domain).remove();

                update_progress();

  
                $('#is_active').val(0);
                read_queue();
            }
        });
    }

    $(function(){
        $("#view-switch").bootstrapSwitch({
            onText: 'Section',
            offText: 'Table',
            state: true,
            onSwitchChange: function(event, state) {
     
                $('.view-style').hide();
                if(state){
                    $("#results-content").show();
                }else{
                    $("#dvData").show();
                }
            }
        });

        $('#myModal').on('show.bs.modal', function (e) {

        })


        $('#domain_name').on('keyup', function(e){
            if ($(this).is(":focus") && (e.keyCode == 13)) {
                check_now($.trim($('#domain_name').val()));
            }
        });
        $('#domain_name_bulk').on('keyup', function(e){

        });
        $('#check-now').on('click', function(){
            check_now($.trim($('#domain_name').val()));
        });

        $('#check-now-bulk').on('click', function(){
            var entered = $('#domain_name_bulk').val();
            var lines = entered.split(/\n/);
            for(var i in lines) {
                check_now(lines[i]);
            }
        });

        $('#thefile').bind('uploadcsv', function(e) {
            if (e.target.files != undefined) {
                var reader = new FileReader();
                var content = '';
                reader.onload = function(e) {
                    var this_table = '<table class="table table-striped no-margn">';
                    var this_records = CSVToArray(e.target.result, ',');
                    $.each(this_records, function( index, value ) {
                        if(value != ''){
                            check_now($.trim(value));
                        }
                    });
                };
                reader.readAsText(e.target.files.item(0));
            }else{
                alert("Can't seem to process this csv.");
                return false;
            }
        });

    });

    function toggle_details(id_domain){
        $('#details-'+id_domain).toggle();
    }

    function add_csv(){
        var file = $('#thefile').val();
        var extension = file.substr( (file.lastIndexOf('.') +1) );
        if(extension != 'csv'){
            alert('Can\'t read file. Please make sure it is in a CSV format.');
            return false;
        }
        $('#thefile').trigger('uploadcsv');
    }

    function CSVToArray( strData, strDelimiter ){
        strDelimiter = (strDelimiter || ",");
        var objPattern = new RegExp(
                (
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
                ),
                "gi"
        );
        var arrData = [[]];
        var arrMatches = null;
        while (arrMatches = objPattern.exec( strData )){
            var strMatchedDelimiter = arrMatches[ 1 ];
            if (
                    strMatchedDelimiter.length &&
                    (strMatchedDelimiter != strDelimiter)
            ){
                arrData.push( [] );
            }
            if (arrMatches[ 2 ]){var strMatchedValue = arrMatches[ 2 ].replace(
                    new RegExp( "\"\"", "g" ),
                    "\""
            );
            } else {
                var strMatchedValue = arrMatches[ 3 ];
            }   arrData[ arrData.length - 1 ].push( strMatchedValue );
        }   return( arrData );
    }

    function add_to_queue(domain){
        var id_domain = get_domain_id(domain);
        var inputdomain = '<input class="q_input" id="q_'+id_domain+'" value="'+domain+'" style="display:none;"/>';
        $('#queue').append(inputdomain);

        /*show view toggle*/
        $('#view-toggle').show();

        $('#progress-div').fadeIn('slow');
        $('#total_on_q').val(parseInt($('#total_on_q').val()) + 1);
    }

    function update_progress(){
        /*total is messed up*/
        var total = $('#total_on_q').val();
        //$('#total_on_q').val(total);
        var finished = parseInt($('#finish_on_q').val()) + 1;
        $('#finish_on_q').val(finished);

        var progress = (finished / total) * 100;

        $('.no_progress').text(progress.toFixed(2));
        $('#the-progress-bar').attr('aria-valuenow', progress);
        $('#the-progress-bar').attr('style', 'width: '+progress+'%');
        if(progress >= 100){
            $('#total_on_q').val(0);
            $('#finish_on_q').val(0);
            setTimeout(function() {
                $('#progress-div').hide();
            }, 2000);

        }

    }
    function read_queue(){
        if($('#is_active').val() == 0){
            var domain = $("#queue input:first").val();
            if(typeof domain === "undefined"){
                return false;
            }else{
                request_data(domain);
            }
        }
    }

    function get_domain_id(domain){
        var id_domain = domain.split('.').join('-');
        id_domain = id_domain.split('index.html').join('-');
        id_domain = id_domain.split('?').join('-');
        id_domain = id_domain.replace(/[^\w\s]/gi, '-');
        return id_domain;
    }
    function get_details(this_index, this_val){
        /*details*/
        var strVar = '';
        var result = this_index.replace( /([A-Z])/g, " $1" );
        var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
        strVar += '<strong>'+finalResult+':</strong> '+this_val+'<hr />';
        return strVar;
    }

    function validate_domain(domain){
        return true;
    }

    /*
     * export code
     * */

    $(document).ready(function () {

        function exportTableToCSV($table, filename) {

            var $rows = $table.find('tr:has(td)'),
                    tmpColDelim = String.fromCharCode(11), // vertical tab character
                    tmpRowDelim = String.fromCharCode(0), // null character
                    colDelim = '","',
                    rowDelim = '"\r\n"',

                    csv = '"' + $rows.map(function (i, row) {
                                var $row = $(row),
                                        $cols = $row.find('td');

                                return $cols.map(function (j, col) {
                                    var $col = $(col),
                                            text = $col.text();

                                    return text.replace('"', '""'); // escape double quotes

                                }).get().join(tmpColDelim);

                            }).get().join(tmpRowDelim)
                                    .split(tmpRowDelim).join(rowDelim)
                                    .split(tmpColDelim).join(colDelim) + '"',

            // Data URI
                    csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

            $(this)
                    .attr({
                        'download': filename,
                        'href': csvData,
                        'target': '_blank'
                    });
        }

        // This must be a hyperlink
        $(".export").on('click', function (event) {
            // CSV
            exportTableToCSV.apply(this, [$('#dvData>table'), 'export-mobile-results.csv']);

            // IF CSV, don't do event.preventDefault() or return false
            // We actually need this to be a typical hyperlink
        });
    });