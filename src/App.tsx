import Main from "@/components/Main/Main";
import SidebarDrawer from "@/components/Sidebar/SidebarDrawer";

function App() {
  return (
    <div className='flex'>
      <SidebarDrawer />
      <Main />
    </div>
  );
}

export default App;
