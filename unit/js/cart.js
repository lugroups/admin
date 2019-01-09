
new Vue({
	el:"#app",
	
	data:{
		totalMoney:0,
		productList:[],
		checkAllFlag:false,
		delFlag:false,
		product:''
		
	},
	filters:{
		filterMoney:function(value){
			
			return "$"+value+"元";
		}
		
	},
	mounted:function(){ 	
		this.$nextTick(function () {
    // Code that will run only after the
    // entire view has been rendered
     this.cartView();
  })
		
	},
	methods:{
		cartView:function(){   //展示列表
		
			var _this=this;
			this.$http.get("data/cartData.json").then(function(res){
				console.log(res)
			    /*_this.totalMoney=res.data.result.totalMoney;*/
				_this.productList=res.data.result.list;
			})
		},
		changeMoney:function(item,type){   //加号减号
			if(type>0){
				item.productQuantity++;
			}else{
				item.productQuantity--;
				if(item.productQuantity==0){
					item.productQuantity=1;
				}
			}	
			this.countALLMoney();
		},
		selectedProduct:function(item){  //选中商品
			var flag=true;
		    var _this=this;
			if(typeof item.checked =='undefined'){
				this.$set(item,"checked",true)
			}else{
				item.checked=!item.checked;
			}
		  this.defaultAllCheck(item);
		  this.countALLMoney();
		},
		
	    defaultAllCheck:function(item){
	    	 var _this=this;
	    	 var flag=false;	
	    	 var count=0;
	    	for(i in _this.productList){
	    		if(typeof i.checked !='undefined'){
	    		if(i.checked!=true){
	    			flag=false;
	    			break;
	    		}else{
	    			count++;
	    		}
	    		}
	    	}
	    	if(count==_this.productList.length){
	    		flag=true;
	    	}
		    _this.checkAllFlag=flag;
	    	
	    },
		
		checkAll:function(flag){   //全选
			this.checkAllFlag=!this.checkAllFlag;
		    var _this=this;
		    this.productList.forEach(function(item){
		    	if(typeof item.checked =='undefined'){
		    		_this.$set(item,"checked",_this.checkAllFlag)
		    	}else{
		    		item.checked=_this.checkAllFlag;
		    	}	
		    });	
		    this.countALLMoney();
		},
		countALLMoney:function(){  //计算总金额
			var _this=this;
			this.totalMoney=0;
			 this.productList.forEach(function(item){
			 	if(item.checked){
			 		_this.totalMoney+=item.productQuantity*item.productPrice;	
			 	} 	
			 });
			
		},
		countMoneys:function(){
			var _this=this;
			this.totalMoney=0;
			this.productList.forEach(function(item){ 	
			 		_this.totalMoney+=item.productQuantity*item.productPrice;	
			 });
			
		},
		delConfirm:function(item){  //获取当前要删除的对象
			this.delFlag=true;
			
			this.product=item;
			//alert("sss");
		},
		delProduct:function(){  //删除对象
			var index=this.productList.indexOf(this.product)
			this.productList.splice(index,1);
			this.delFlag=false;
		}	
	}	
});

