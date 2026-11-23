import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from "react-router-dom";
import Sidebar from '@/features/dashboard/components/Sidebar';
import Loading from '@/components/common/Loading';

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (profileLoading || authLoading) {
    return (
      <div className='mt-10'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
      <Sidebar />
      <div className='min-h-[calc(100vh-3.5rem)] w-full overflow-y-auto bg-slate-50 lg:ml-[280px]'>
        <div className='p-5 sm:p-6 lg:p-8'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

