import RequireAuth from '../components/RequireAuth';

const ProtectedPage = () => {
  return (
    <RequireAuth>
      <div>
        <h1 className="text-2xl font-bold">This is a protected page</h1>
        {/* Your protected content here */
          <h2>i am best</h2>
        }
      </div>
    </RequireAuth>
  );
};

export default ProtectedPage;
