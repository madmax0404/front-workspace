import Component from './01_react_basic/01.Component';
import ParentComponent from './01_react_basic/02.PropsAndState';
import ArrayDataBinding from './01_react_basic/03.ArrayBinding';
import ObjectDataBinding from './01_react_basic/04.ObjectBinding';
import ModuleCSS from './01_react_basic/05.ModuleCss';
import Header from './01_react_basic/Header';
import UseEffectHook from './02_react_advanced/01_UseEffectHook';
import OptimizationHook from './02_react_advanced/02_OptimizationHook';
import SignUpForm from './02_react_advanced/03_CustomHook';
import AxiosGet from './02_react_advanced/04_Axios_GET';
import AxiosPost from './02_react_advanced/04_Axios_POST';
import './App.css'
import UserInfoContainer from './practice/1.PropsPractice';
import TestApp from './test1/TestApp';

function App() {
  return (
    <>
      {/* <Component/> */}
      {/* <ParentComponent/> */}
      {/* <UserInfoContainer/> */}
      {/* <ArrayDataBinding/> */}
      {/* <ObjectDataBinding/> */}
      {/* <ModuleCSS/> */}
      {/* <UseEffectHook/> */}
      {/* <TestApp/> */}
      {/* <OptimizationHook/> */}
      {/* <SignUpForm/> */}
      <AxiosGet/>
      <AxiosPost/>
    </>
  )
}

export default App;
