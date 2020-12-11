import React, {Component, Fragment} from 'react'
import axios from 'axios'
class MovieList extends Component{
   constructor(props) {
       super(props);
       this.state={
           movie:[],
           page:1,
           totalpage:0,
           cateno:1
       }
       // 이벤트 등록
       this.prev=this.prev.bind(this)
       this.next=this.next.bind(this)
   }
   // 메모리에 HTML을 전송하기 전상태 => 데이터를 받는다
   componentWillMount() {
      this.post()
   }
   prev()
   {
       this.state.page=this.state.page>1?this.state.page-1:this.state.page
       this.post()
   }
   next()
   {
       this.state.page=this.state.page<this.state.total?this.state.page+1:this.state.page
       this.post()
   }
   change(cateno)
   {
       this.setState({cateno:cateno})
       this.post()
   }
   // 사용자 정의는 자동 호출이 불가능 => 호출
   post()
   {
       axios.get("http://localhost/webapp/movie/total.do",{
           params:{
               cateno:this.state.cateno
           }
       }).then((response)=>{
           this.setState({total:response.data})
       })

       axios.get("http://localhost/webapp/movie/list.do",{
           params:{
               page:this.state.page,
               cateno:this.state.cateno
           }
       }).then((response)=>{
           this.setState({movie:response.data})
       })
   }
   // 화면 출력하는 위치
   render() {
       const html=this.state.movie.map((m)=>
           <div className="col-md-4">
               <div className="thumbnail">
                   <a href="#">
                       <img src={m.poster} alt="Lights" style={{"width":"100%"}}/>
                           <div className="caption">
                               <p>{m.title}</p>
                               <p>{m.genre}({m.score})</p>
                           </div>
                   </a>
               </div>
           </div>
       )
       return (
           <Fragment>
               <h1 className={"text-center"}>영화 목록</h1>
               <div style={{"height":"50px"}}></div>
               <div className={"row"}>
                   <input type={"button"} className={"btn btn-sm btn-primary"}
                          value={"현재상영영화"} onClick={this.change.bind(this,1)}
                   />
                   <input type={"button"} className={"btn btn-sm btn-success"}
                          value={"개봉예정영화"} onClick={this.change.bind(this,2)}
                   />
                   <input type={"button"} className={"btn btn-sm btn-warning"}
                          value={"박스오피스(주간)"} onClick={this.change.bind(this,3)}
                   />
                   <input type={"button"} className={"btn btn-sm btn-danger"}
                          value={"박스오피스(월간)"} onClick={this.change.bind(this,4)}
                   />
                   <input type={"button"} className={"btn btn-sm btn-info"}
                          value={"박스오피스(연간)"} onClick={this.change.bind(this,5)}
                   />
               </div>
               <div style={{"height":"15px"}}></div>
               <div className={"row"}>
                   {html}
               </div>
               <div style={{"height":"15px"}}></div>
               <div className={"row"}>
                   <div className={"text-center"}>
                       <input type={"button"} className={"btn btn-sm btn-danger"}
                              value={"이전"} onClick={this.prev}/>
                         {this.state.page} page / {this.state.total} pages
                       <input type={"button"} className={"btn btn-sm btn-success"}
                              value={"다음"} onClick={this.next}/>
                   </div>
               </div>
           </Fragment>
       )
   }
}
export default MovieList;