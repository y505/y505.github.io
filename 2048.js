var game={
    data:null,
    score:0,
    RN:4,
    CN:4,
    state:1,
    RUNNING:1,
    GAMEOVER:0,
    start(){
         this.state=this.RUNNING;
         this.score=0;
    	   this.data=[];
    	   for(var r=0;r<this.RN;r++){
                this.data[r]=[];
            for(var c=0;c<this.CN;c++){
                this.data[r][c]=0;
            }

    	 }
         this.randomnum();
         this.randomnum();
         this.updata();
         document.onkeydown=function(e){

            switch(e.keyCode){
               case 37:
                   this.moveleft(); break;
               case 38:
                   this.movetop(); break;
               case 39:
                   this.moveright();break;
               case 40:
                   this.movedown();
              
            }

         }.bind(this);
    	// console.log(this.data.join("\n"))
    },

    randomnum(){
    	while(true){
           var r=Math.floor(Math.random()*this.RN);
           var c=Math.floor(Math.random()*this.CN);
           if(this.data[r][c]==0){
            this.data[r][c]=Math.random()<0.5?8:8;
            break;
           }
    	}
    },

    updata(){
      for(var r=0;r<this.RN;r++){
         for(var c=0;c<this.CN;c++){
           var n=this.data[r][c];
           var div=document.getElementById("c"+r+c);
           if(n!=0){
             div.innerHTML=n;
             div.className="cell n"+n;
           }else{
             div.innerHTML="";
             div.className="cell";
           }
         }
        
        } 
        
        document.getElementById("score")
            .innerHTML=this.score;
    //设置id为gameOver的display为: 
      //如果游戏结束就显示，否则就隐藏
    document.getElementById("gameOver")
            .style.display=this.state===this.GAMEOVER?"block":"none";
    //如果游戏结束,就设置id为final的span的内容为score属性
    this.state===this.GAMEOVER&&(
      document.getElementById("final")
              .innerHTML=this.score
    );
      
    },

    moveleft(){
      var before=String(this.data);
      for(var r=0;r<this.RN;r++){
        this.moveleftInrow(r);
      }
      var after=String(this.data);
      if(before!=after){
         this.randomnum();

        this.isgameover()&&
        (this.state=this.GAMEOVER);
         this.updata();
      }

    },

    isgameover(){
       for(var r=0;r<this.RN;r++){//遍历data
         for(var c=0;c<this.CN;c++){
        //如果当前元素是0或
          //c<this.CN-1且当前元素等于右侧元素或
          //r<this.RN-1且当前元素等于下方元素
         if(this.data[r][c]==0||
            c<this.CN-1
            &&this.data[r][c]==this.data[r][c+1]||
            r<this.RN-1
            &&this.data[r][c]==this.data[r+1][c]){  
          return false;//就返回false
        }
      }
    }//(遍历结束)
     return true;//返回true
    },

    moveleftInrow(r){
       for(var c=0;c<this.CN-1;c++){
          var nextc=this.getnextc(r,c);
          if(nextc==-1) break;
          else if(this.data[r][c]==0){
                this.data[r][c]=this.data[r][nextc];
                this.data[r][nextc]=0;
                c--;
          }else if(this.data[r][c]==this.data[r][nextc]){
            this.data[r][c]*=2;
            this.score+=this.data[r][c];
            this.data[r][nextc]=0;
          }
        
       }
    },
    getnextc(r,c){
        for(var i=c+1;i<this.CN;i++){
           if(this.data[r][i]!=0) return i;
         }
         return -1;
    },




    moveright(){
      var before=String(this.data);
      for(var r=0;r<this.RN;r++){
        this.moverightInrow(r);
      }
      var after=String(this.data);
      if(before!=after){
         this.randomnum();
         this.isgameover()&&
        (this.state=this.GAMEOVER);
         this.updata();
       }
      },

      moverightInrow(r){
          for(var c=this.CN-1;c>0;c--){
          var prevc=this.getprevc(r,c);
          if(prevc==-1) break;
          else if(this.data[r][c]==0){
                this.data[r][c]=this.data[r][prevc];
                this.data[r][prevc]=0;
                c++;
          }else if(this.data[r][c]==this.data[r][prevc]){
            this.data[r][c]*=2;
            this.score+=this.data[r][c];
            this.data[r][prevc]=0;
          }
        
       }
      },

      getprevc(r,c){
         for(var i=c-1;i>=0;i--){
           if(this.data[r][i]!=0) return i;
         }
         return -1;
      },




      movetop(){
      var before=String(this.data);
      for(var c=0;c<this.CN;c++){
        this.movetopIncol(c);
      }
      var after=String(this.data);
      if(before!=after){
         this.randomnum();
        this.isgameover()&&
        (this.state=this.GAMEOVER);
         this.updata();
       }
      },

      movetopIncol(c){
          for(var r=0;r<this.RN-1;r++){
          var nextr=this.getnextr(r,c);
          if(nextr==-1) break;
          else if(this.data[r][c]==0){
                this.data[r][c]=this.data[nextr][c];
                this.data[nextr][c]=0;
                r--;
          }else if(this.data[r][c]==this.data[nextr][c]){
            this.data[r][c]*=2;
            this.score+=this.data[r][c];
            this.data[nextr][c]=0;
          }
        
       }
      },

      getnextr(r,c){
         for(var i=r+1;i<this.RN;i++){
           if(this.data[i][c]!=0) return i;
         }
         return -1;
      },



      movedown(){
      var before=String(this.data);
      for(var c=0;c<this.CN;c++){
        this.movedownIncol(c);
      }
      var after=String(this.data);
      if(before!=after){
         this.randomnum();
        this.isgameover()&&
        (this.state=this.GAMEOVER);
         this.updata();
       }
      },

      movedownIncol(c){
          for(var r=this.RN-1;r>0;r--){
          var prevr=this.getprevr(r,c);
          if(prevr==-1) break;
          else if(this.data[r][c]==0){
                this.data[r][c]=this.data[prevr][c];
                this.data[prevr][c]=0;
                r--;
          }else if(this.data[r][c]==this.data[prevr][c]){
            this.data[r][c]*=2;
            this.score+=this.data[r][c];
            this.data[prevr][c]=0;
          }
        
       }
      },

      getprevr(r,c){
         for(var i=r-1;i>=0;i--){
           if(this.data[i][c]!=0) return i;
         }
         return -1;
      },

}
 game.start();