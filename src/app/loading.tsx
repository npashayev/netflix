import Loading from '@/lib/components/ui/loading/Loading';

export default function loading() {
    return (
        <div className='flex flex-col gap-2 justify-start items-center h-screen bg-black text-white text-2xl p-20'>
            <Loading />
            Loading page
        </div>
    );
}
