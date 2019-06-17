(function() {
    // console.log(oParameter.storeName);
    // console.log(oData);
    // console.log(oData.storeList);
    var iITime = setInterval(function() {
        if (oData) {
            clearInterval(iITime);
            var jData = oData.storeList[oParameter.storeName];
            var into = {
                sUrl: 'http://www.yijiago.com/promotion/app/rearEnd/mall/yjg.php',
                sUrl2: 'http://www.yijiago.com/promotion/app/rearEnd/mall/yjg2.php',
                id: 'articleContent',
                href: '',
                arrTem: [],
                aTime: [],
                aOnOff: [],
                couponOn: false,
                tabOnOff: true,
                errorArr: [],
                run: function() {
                    var oBox = document.getElementById(this.id);
                    var headerTitle = document.getElementsByClassName("tit")[0];
                    headerTitle.innerHTML = oData.title + "-" + jData.storeName;
                    var _className = "article2_" + oParameter.number + " " + oParameter.activityName + " " + oParameter.storeName;
                    if (jData.items[0].type == 'tab') {
                        _className = _className + ' tabWrap';
                    }
                    oBox.className = _className;

                    oBox.innerHTML = '<div class="ui-loading-wrap"><div class="ui-loading-spinner"><img src="https://test.yijiago.com/gly/yiJiaGo/images/icon/load.png"> <svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg> <span class="text">请求加载中...</span></div></div>';
                    this.getHerf();
                    this.getItems(jData.items);
                },
                setCode: function() {
                    //console.log(this.arrTem);
                   // console.log('setCode');
                    var aTem = oData.template;
                    var _html = this.setTemHtml();
                    var timeScript = '';
                    var strHtml = '';

                    oData.banner = oData.banner + '?t=' + Math.random();

                    if (aTem[0] == 'app') {
                        var _styleHtml = appHtml.styleHtml.replace(/\{\$background\}/, oData.background);
                        var _contentHtml = appHtml.contentHtml.replace(/\{\$templateNumber\}/, this.getTemplateNumber());

                        _contentHtml = _contentHtml.replace(/\{\$imgSrc\}/, oData.banner);
                        _contentHtml = _contentHtml.replace(/\{\$content\}/, _html);

                        if (aTem[1] == 'supermarketHome') {

                            var _footImg = appHtml.footImg.replace(/\{\$background\}/, oData.background);
                            strHtml = _styleHtml + _contentHtml + timeScript + _footImg;

                        } else if (aTem[1] == 'globalPurchase') {

                            var _footImg2 = appHtml.footImg2.replace(/\{\$background\}/, oData.background);
                            strHtml = _styleHtml + _contentHtml + timeScript + _footImg2;

                        } else {
                            strHtml = _styleHtml + _contentHtml + timeScript;
                        }

                        // if(this.couponOn){
                        //     strHtml = appHtml.scriptHtml+strHtml;
                        // }
                    } else if (aTem[0] == 'pc') {
                        var _styleHtml = pcHtml.styleHtml.replace(/\{\$background\}/, oData.background);
                        var _contentHtml = pcHtml.contentHtml.replace(/\{\$templateNumber\}/, this.getTemplateNumber());
                        _contentHtml = _contentHtml.replace(/\{\$imgSrc\}/, oData.banner);
                        _contentHtml = _contentHtml.replace(/\{\$content\}/, _html);
                        strHtml = _styleHtml + _contentHtml + timeScript;
                    }

                    var oBox = document.getElementById(this.id);

                    oBox.innerHTML = strHtml;
                    this.getProductsInfo();
                    customize.run();
                },
                getTemplateNumber: function() {
                    var aTem = oData.template;
                    var str = 'template-';
                    var num = template[aTem[0]].templateColumn[aTem[1]].templateNumber[aTem[2]];
                    str += num + '-' + aTem[0];
                    return str;
                },
                setTemHtml: function() {
                    var setHtml = '';
                    this.aTime = [];
                    //console.log('setTemHtml');

                    for (var i = 0; i < this.arrTem.length; i++) {
                        if (this.arrTem[i].type == 'txt') {

                            setHtml += '<div class="txtMain proMain"><ul>';
                            setHtml = this.getStrHtml(this.arrTem[i], setHtml);
                            //console.log('getStrHtml 111');
                            setHtml += '</ul></div>';

                        } else if (this.arrTem[i].type == 'txt2') {

                            setHtml += '<div class="freshMain txt2Main proMain" ';
                            if (this.arrTem[i].starttime && this.arrTem[i].endtime) {
                                setHtml += 'startTime="' + this.arrTem[i].starttime + '" endTime="' + this.arrTem[i].endtime + '"';
                            }
                            // console.log(this.arrTem[i].href)
                            // console.log(this.arrTem[i].imgsrc)
                            setHtml += '><div class="title"><a href="' + this.arrTem[i].href + '"><img src="' + this.arrTem[i].imgsrc + '"></a></div><ul>';
                            setHtml = this.getStrHtml(this.arrTem[i], setHtml);
                            setHtml += '</ul></div>';

                        } else if (this.arrTem[i].type == 'fresh') {

                            setHtml += '<div class="freshMain proMain" ';
                            if (this.arrTem[i].proTime) {
                                setHtml += 'startTime="' + this.arrTem[i].starttime + '" endTime="' + this.arrTem[i].endtime + '"';
                            }

                            setHtml += '>';
                            if (this.arrTem[i].proTime) {
                                setHtml += '<div class="freshTitle"><span>' + this.arrTem[i].proTime + '</span></div>';
                            }

                            setHtml += '<ul>';
                            setHtml = this.getStrHtml(this.arrTem[i], setHtml);
                            setHtml += '</ul></div>';

                        } else if (this.arrTem[i].type == 'tab') {

                            if (this.tabOnOff) {
                                setHtml += '<div id="tabHead"><div id="HMain"><div id="tabUl">';

                                for (var ii = 0; ii < jData.items.length; ii++) {
                                    if (ii == 0) {
                                        setHtml += '<a href="javascript:;" class="active"><span>' + jData.items[ii].name + '</span></a>';
                                    } else {
                                        setHtml += '<a href="javascript:;"><span>' + jData.items[ii].name + '</span></a>';
                                    }

                                }
                                setHtml += '</div></div></div><div id="tabCon">';

                                this.tabOnOff = false;
                            }

                            setHtml += '<div class="tabMain">';
                            setHtml = this.getStrHtml(this.arrTem[i], setHtml);
                            setHtml += '</div>';

                            if ((i == this.arrTem.length - 1) || (this.arrTem[i + 1].type != 'tab')) {
                                setHtml += '</div>';
                            }
                        }

                    }
                    return setHtml;
                },
                getStrHtml: function(obj, str) {
                    //console.log(547654856856)
                   // console.log(obj)
                    //console.log(str)

                    var sType = obj.type;
                    var arr = obj.aProduct;
                    //var markWord = arr[0].markWord || '售价';
                    var markWord = '售价';
                    var onNum = false;
                    var onNum2 = false;
                    var rowNum = 2;

                    if (arr.length > 5) {
                        if (arr.length % 2 == 0) {
                            onNum = true;
                        }
                    } else {
                        onNum2 = true;
                    }

                    for (var i = 0; i < arr.length; i++) {

                        if (onNum2) {
                            rowNum = 1;
                        } else {
                            if (!onNum) {
                                if (i == 0) {
                                    rowNum = 1;
                                } else {
                                    rowNum = 2;
                                }
                            }
                        }

                        if (sType == 'txt' || sType == 'txt2') {

                            str += this.setTxtHtml(arr[i], rowNum).replace(/售价/, markWord);

                        } else if (sType == 'fresh') {

                            str += this.setTxtHtml(arr[i], 1);

                        } else if (sType == 'tab') {

                            if (arr[i].type == 'txt') {

                                if (i != 0 && arr[i - 1].type == 'txt') {
                                    str = str.slice(0, -11);
                                    str += this.setTxtHtml(arr[i], rowNum).replace(/售价/, markWord);
                                    str += '</ul></div>';
                                } else {
                                    str += '<div class="txtMain proMain"><ul>';
                                    str += this.setTxtHtml(arr[i], rowNum).replace(/售价/, markWord);
                                    str += '</ul></div>';
                                }
                            }
                        }

                    }
                    return str;
                },
                setTxtHtml: function(obj, rowNum) {
                    //console.log(obj)
                    //console.log(rowNum)

                    var aTem = oData.template;
                    var _html2 = template[aTem[0]].templateColumn[aTem[1]].htmlCode[aTem[2]];
                    if (obj.show_mkt_prce) {
                        _html2 = _html2.replace(/ hideDel/, '');
                    }
                    // if (obj.store < 1) {
                    //     _html2 = _html2.replace(/ hideSold/, '');
                    // }
                    if (obj.halfPrice) {
                        _html2 = _html2.replace(/\{\$halfPrice\}/, '<img src="https://test.yijiago.com/gly/yiJiaGo/images/icon/halfPrice.png" class="halfPrice">');
                    } else {
                        _html2 = _html2.replace(/\{\$halfPrice\}/, '');
                    }

                    _html2 = _html2.replace(/\{\$column\}/, rowNum);
                    _html2 = _html2.replace(/\{\$column\}/, rowNum);
                    _html2 = _html2.replace(/\{\$href\}/, obj.aHref);
                    _html2 = _html2.replace(/\{\$imgSrc\}/, obj.imageSrc);
                    _html2 = _html2.replace(/\{\$proInfo\}/, obj.title);
                    _html2 = _html2.replace(/\{\$del\}/, obj.marketPrice == null ? console.log('链接：' + obj.aHref + ' 错误') : this.getnum(obj.marketPrice));
                    _html2 = _html2.replace(/\{\$price\}/, obj.price == null ? console.log('链接：' + obj.aHref + ' 错误') : this.getnum(obj.price));
                    return _html2;
                },
                getTxtItem: function(res, obj, num, num2) {
                    var aInfo = res.info;
                    var aId = [];
                    var oItem = (num2 == undefined) ? jData.items[num] : jData.items[num].content[num2];
                    var aProId = oItem.productIds;
                    var sMarkWord = oItem.markWord;
                    var aHalfPrice = oItem.aHalfPrice || false;
                    var onHalf = false;

                    if (typeof aHalfPrice == 'boolean' || typeof aHalfPrice == 'BOOLEAN') {
                        if (aHalfPrice == true) {
                            onHalf = true;
                        }
                    }

                    for (var ii = 0; ii < aInfo.length; ii++) {
                        aId.push(aInfo[ii].item_id);
                    }

                    //obj.arrTem[num].aProduct = [];
                    for (var ii = 0; ii < aInfo.length; ii++) {
                        var onContinue = false;
                        for (var iii = 0; iii < into.errorArr.length; iii++) {
                            if (ii == into.errorArr[iii]) {
                                onContinue = true;
                                continue;
                            }
                        }
                        if (onContinue) {
                            continue;
                        }

                        var n = aId.indexOf((aProId[ii]));

                        var oProduct = {};
                        oProduct.type = 'txt';
                        oProduct.id = aProId[ii];
                        oProduct.title = aInfo[n].title;

                        if (aHalfPrice) {
                            if (onHalf) {
                                oProduct.halfPrice = true;
                            } else {
                                if (aHalfPrice.indexOf((ii + 1) + '') > -1) {
                                    oProduct.halfPrice = true;
                                } else {
                                    oProduct.halfPrice = false;
                                }
                            }

                        } else {
                            oProduct.halfPrice = false;
                        }

                        oProduct.price = aInfo[n].price;
                        oProduct.marketPrice = aInfo[n].mkt_prce;
                        oProduct.store = aInfo[n].store;
                        oProduct.imageSrc = aInfo[n].image_url + '?t=' + Math.random();
                        oProduct.aHref = obj.href + aProId[ii];
                        //oProduct.rowNum = oItem.rowNum[ii];
                        oProduct.markWord = sMarkWord;
                        oProduct.show_mkt_prce = aInfo[n].show_mkt_prce || (oProduct.marketPrice == oProduct.price ? false: true);

                        obj.arrTem[num].aProduct.push(oProduct);
                    }

                    //console.log(obj.arrTem[num].aProduct);
                    (num2 == undefined) ? obj.aOnOff[num] = '1': obj.aOnOff[num][num2] = '1';
                },
                getFreshItem: function(res, obj, num, num2) {
                    var aInfo = res.info;
                    var aId = [];
                    var oItem = jData.items[num];
                    var aProId = oItem.productIds;
                    //var sProTime = oItem.proTime;

                    for (var ii = 0; ii < aInfo.length; ii++) {
                        aId.push(aInfo[ii].item_id);
                    }

                    //obj.arrTem[num].aProduct = [];
                    for (var ii = 0; ii < aInfo.length; ii++) {
                        var onContinue = false;
                        for (var iii = 0; iii < into.errorArr.length; iii++) {
                            if (ii == into.errorArr[iii]) {
                                onContinue = true;
                                continue;
                            }
                        }
                        if (onContinue) {
                            continue;
                        }

                        var n = aId.indexOf((aProId[ii]));

                        var oProduct = {};
                        oProduct.type = 'fresh';
                        oProduct.id = aProId[ii];
                        oProduct.title = aInfo[n].title;
                        oProduct.halfPrice = false;
                        oProduct.price = aInfo[n].price;
                        oProduct.marketPrice = aInfo[n].mkt_prce;
                        oProduct.store = aInfo[n].store;
                        oProduct.imageSrc = aInfo[n].image_url + '?t=' + Math.random();
                        oProduct.aHref = obj.href + aProId[ii];
                        oProduct.show_mkt_prce = aInfo[n].show_mkt_prce || (oProduct.marketPrice == oProduct.price ? false: true);

                        obj.arrTem[num].aProduct.push(oProduct);
                    }

                    //console.log(obj.arrTem[num].aProduct);
                    obj.aOnOff[num] = '1';
                },
                getItems: function(arr) {
                   // console.log(arr);
                     for (var i = 0; i < arr.length; i++) {

                         var that = this;

                        (function(_n) {

                            var oTem = {
                                type: arr[_n].type,
                                aProduct: []
                            }

                            that.arrTem[_n] = oTem;
                            that.aOnOff[_n] = '0';

                            if (arr[_n].type == 'txt') {
                                that.getProducts(arr[_n].productIds, that.getTxtItem, _n);
                            } else if (arr[_n].type == 'txt2') {
                                if (arr[_n].starttime && arr[_n].endtime) {
                                    oTem.starttime = arr[_n].starttime;
                                    oTem.endtime = arr[_n].endtime;
                                }
                                oTem.href = arr[_n].href;
                                oTem.imgsrc = arr[_n].imgsrc;
                                that.getProducts(arr[_n].productIds, that.getTxtItem, _n);
                            } else if (arr[_n].type == 'fresh') {
                                if (arr[_n].proTime) {
                                    oTem.proTime = arr[_n].proTime;
                                    oTem.starttime = arr[_n].starttime;
                                    oTem.endtime = arr[_n].endtime;
                                }
                                that.getProducts(arr[_n].productIds, that.getFreshItem, _n);
                            } else if (arr[_n].type == 'tab') {
                                that.aOnOff[_n] = [];
                                for (var ii = 0; ii < arr[_n].content.length; ii++) {
                                    that.aOnOff[_n][ii] = '0';
                                    if (arr[_n].content[ii].type == 'txt') {
                                        that.getProducts(arr[_n].content[ii].productIds, that.getTxtItem, _n, ii);
                                    }
                                }
                            }

                        })(i);
                    }

                    var that = this;
                    var _itme = setInterval(function() {
                        
                        if (that.aOnOff.join(",").split(",").join("").indexOf('0') == -1) {
                            clearInterval(_itme);
                            that.setCode();
                        }
                    },
                    200);
                },
                getHerf: function() {
                    var aTem = oData.template;
                    if (aTem[0] == 'app') {
                        this.href = '#/goods/';
                    } else {
                        this.href = 'http://www.yijiago.com/index.php/item.html?item_id=';
                    }
                },
                getProductsInfo:function(){
                    var that = this;
                    var url = this.sUrl2;
                    var oBox = document.getElementById(this.id);
                    var aLi= oBox.getElementsByTagName('li');
                    for(var i=0;i<aLi.length;i++){
                         (function(n) {
                                var oLi = aLi[n];
                                var oA= oLi.children[0];
                                var oImg= oLi.children[0];
                                var oLi_id = oA.getAttribute("href").substr(8);
                                var proImg = oA.getElementsByTagName('img')[0];
                                var proInfo = oA.getElementsByClassName('proInfo')[0];
                                var price = oA.getElementsByClassName('price')[0].getElementsByTagName('span')[0];
                                var del= oA.getElementsByTagName('del')[0].getElementsByTagName('span')[0];
                                var str = oLi_id;
                                axios.get(url, {
                                    params: {
                                        productId: str,
                                        t: Math.random()
                                    }
                                }).then(function(res) {

                                    var _obj = res.data.data.item;

                                    // var oJson = {
                                    //     item_id: '',
                                    //     title: '',
                                    //     image_url: '',
                                    //     mkt_prce: '',
                                    //     price: '',
                                    //     store: '',
                                    //     show_mkt_prce: true
                                    // }

                                    if (_obj == undefined) {
                                        that.errorArr.push(n);
                                        //_json.info.push(oJson)
                                    }

                                    if (_obj) {
                                        // oJson.item_id = _obj.item_id + '';
                                        // oJson.title = _obj.title;
                                        // oJson.image_url = _obj.image_default_id;
                                        // oJson.mkt_prce = _obj.mkt_price;
                                        // oJson.price = _obj.price;
                                        // oJson.store = _obj.store;

                                        proImg.src = _obj.image_default_id +'?t=' + Math.random();
                                        proInfo.innerHTML = _obj.title;
                                        price.innerHTML = that.getnum(_obj.price);
                                        del.innerHTML = that.getnum(_obj.mkt_price);
                                        if(_obj.store<1){
                                            oLi.classList.remove("hideSold");
                                        }

                                        if (_obj.mkt_price == _obj.price) {
                                            oLi.classList.add("hideDel");
                                        }

                                        // _json.info.push(oJson)
                                    }
                                })
                            })(i)

                    }
                },
                getProducts: function(arr, endFn, n1, n2) {
                    var that = this;
                    that.errorArr = [];
                    if (oData.port) {
                        var url = this.sUrl2;
                        var _json = {
                            code: 0,
                            info: []
                        }

                        for (var i = 0; i < arr.length; i++) { 
                                    var oJson = {
                                        item_id: arr[i],
                                        title: '',
                                        image_url: '',
                                        mkt_prce: '',
                                        price: '',
                                        store: '',
                                        show_mkt_prce: true
                                    }
                                    
                                    _json.info.push(oJson)
                                
                        }


                        endFn && endFn(_json, that, n1, n2);

                    } else {
                        var url = this.sUrl;
                        var str = arr.join(',');
                        axios.get(url, {
                            params: {
                                productIds: str,
                                t: Math.random()
                            }
                        }).then(function(res) {
                            //console.log(res.data)
                            endFn && endFn(res.data, that, n1, n2);
                        })
                    }
                },
                getnum: function(num) {
                    //console.log(num)
                    var result = '';
                    var len = num.length;
                    var onOff = num.indexOf(".");
                    var end = onOff + 3;

                    if (onOff > -1) {
                        if (len < end) {
                            result = num + '0';
                        } else {
                            result = num.substring(0, end);
                        }
                    } else {
                        result = num + '.00';
                    }

                    return result;
                }
            }

            into.run();
        }
    },
    200);

})();