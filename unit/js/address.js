new Vue({
	el:'.container',
	
	data:{
		addressList:[],
		pageNum:3,
		currentIndex:0,
		delivery:1
	},
	mounted:function(){
		this.$nextTick(function () {
    // Code that will run only after the
    // entire view has been rendered
        this.addressView();
      })
	},
	computed: {
		filterAddress:function(){
			
			return this.addressList.slice(0,this.pageNum)
		}
		
	},
	methods:{
		addressView:function(){
			this.$http.get("data/address.json").then(function(res){
				console.log(res)
				if(res.status==200){
					this.addressList=res.data.result;
				}
			   
			})
		},
		moreAddress:function(){
			
			this.pageNum=this.addressList.length;
		},
		defaultAddress:function(addressId){
			
			this.addressList.forEach(function(item,index){
				
				if(item.addressId==addressId){
					item.isDefault=true
				}else{
					item.isDefault=false
				}
			});
			
			
		}
		
	}	
});

