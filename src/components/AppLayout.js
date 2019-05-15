// const React = require("react");
// const HeaderComponent = require(".HeaderComponent");
//
// class AppLayout extends React.Component {
//
//   render() {
//
//     return (
//
//       <div id = "app-content">
//
//         <HeaderComponent/>
//
//         <div id = "tab-content">
//
//           <div class="row">
//             <div class="col">
//               <button id = "add-transaction-btn" class="btn btn-primary" type="button" data-loading-text="Saving..." data-toggle="modal" data-target="#add-transaction-popup">Add transaction</button>
//
//               <div class="modal fade" id="add-transaction-popup" tabindex="-1" role="dialog" aria-hidden="true">
//                 <div class="modal-dialog modal-dialog-centered" role="document">
//                   <div class="modal-content">
//                     <div class="modal-header">
//                       <h5 class="modal-title" id="exampleModalLongTitle">Transaction</h5>
//                       <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                         <span aria-hidden="true">&times;</span>
//                       </button>
//                     </div>
//                     <div class="modal-body">
//                       <label for="exampleInputEmail1">Title</label>
//                       <input type="text" class="form-control"  placeholder="Enter title"/>
//                       <label for="exampleInputEmail1">Amount</label>
//                       <input type="number" class="form-control" placeholder="Enter amount"/>
//                       <label for="exampleInputEmail1">Spent On </label>
//                       <input type="text" name="birthdate"  class="form-control" />
//                       <label for="exampleInputEmail1">Notes</label>
//                       <textarea class="form-control" placeholder="Enter notes"></textarea>
//                     </div>
//                     <div class="modal-footer">
//                       <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
//                       <button type="button" class="btn btn-primary">Save changes</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//
//               <table class="table table-hover">
//                 <thead>
//                   <tr>
//                     <th scope="col">Title</th>
//                     <th scope="col">Amount</th>
//                     <th scope="col">SpentOn</th>
//                     <th scope="col">Notes</th>
//                     <th scope="col">Categories</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>Spent for Petrol</td>
//                     <td>5.89</td>
//                     <td>3 Jan 208</td>
//                     <td>Test notes</td>
//                     <td><section> <span class="label">Petrol</span> <span class="label">LIC</span></section></td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//
//           <div class="row">
//             <div class="col">
//               <button id = "add-transaction-btn" class="btn btn-primary" type="button" data-loading-text="Saving..." data-toggle="modal" data-target="#add-category-popup">Add category</button>
//
//               <div class="modal fade" id="add-category-popup" tabindex="-1" role="dialog"  aria-hidden="true">
//                 <div class="modal-dialog modal-dialog-centered" role="document">
//                   <div class="modal-content">
//                     <div class="modal-header">
//                       <h5 class="modal-title" id="exampleModalLongTitle">Category</h5>
//                       <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                         <span aria-hidden="true">&times;</span>
//                       </button>
//                     </div>
//                     <div class="modal-body">
//                       <label for="exampleInputEmail1">Name</label>
//                       <input type="text" class="form-control"  placeholder="Enter category name"/>
//                     </div>
//                     <div class="modal-footer">
//                       <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
//                       <button type="button" class="btn btn-primary">Save changes</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//
//               <table class="table table-hover">
//                 <thead>
//                   <tr>
//                     <th scope="col">Category name</th>
//                     <th scope="col">Created on</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>Petrol</td>
//                     <td>3 Jan 208</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//
//           <div class="row">
//             <div class="col">
//               <div id="reportrange" class="pull-right" style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 100%">
//                 <i class="glyphicon glyphicon-calendar fa fa-calendar"></i>&nbsp;
//                 <span></span> <b class="caret"></b>
//               </div>
//               <table class="table table-hover">
//                 <thead>
//                   <tr>
//                     <th scope="col">Category</th>
//                     <th scope="col">Total transactions</th>
//                     <th scope="col">Total amount</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>Petrol</td>
//                     <td>5</td>
//                     <td>30.56</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//
//         </div>
//
//       </div>
//     );
//   }
// }
//
// module.exportsAppLayout = AppLayout;
