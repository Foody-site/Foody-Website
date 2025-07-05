import { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../../utils/ApiClient";
import Pagination2 from "../common/Pagination2";
import ChefCard from "../shared/cards/ChefCard";

const LoadingCard = () => (
  <div className="bg-white p-4 rounded-lg shadow-md border h-72 flex justify-center items-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-1"></div>
  </div>
);

const AllChefs = ({ searchParams = {} }) => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    hasNextPage: false,
    hasPreviousPage: false,
    currentPage: 1,
    totalPages: 1,
  });
  const pageSize = 6;

  useEffect(() => {
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    const fetchChefs = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${api_url}/chef`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
            take: pageSize,
            ...searchParams,
          },
        });

        setChefs(response.data.data || []);
        const pag = response.data.pagination;

        setPagination({
          hasNextPage: pag?.hasNextPage || false,
          hasPreviousPage: pag?.hasPreviousPage || false,
          currentPage: pag?.currentPage || 1,
          totalPages: pag?.totalPages || 1,
        });
        setError("");
      } catch (err) {
        setError("فشل تحميل الطهاة.");
        setChefs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChefs();
  }, [page, searchParams]);

  return (
    <div>
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <LoadingCard key={i} />)
          : chefs.length > 0
          ? chefs.map((chef) => <ChefCard key={chef.id} chef={chef} />)
          : <p className="text-center w-full mt-4">لا توجد نتائج حالياً</p>}
      </div>

      {!loading && (
        <Pagination2 pagination={pagination} setPage={setPage} />
      )}
    </div>
  );
};

export default AllChefs;