import LeftNavbar from '@/components/LeftNavbar';
import LineChart from '@/components/LineChart';

const Dashboard = () => {
  return (
    <section className='flex min-h-screen'>
      <LeftNavbar />
      <div className='flex-1 md:my-1.5 bg-[#252424] md:rounded-tl-2xl md:rounded-bl-2xl'></div>
    </section>
  )
}

export default Dashboard;
