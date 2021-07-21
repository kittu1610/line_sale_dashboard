import React, { useState, useEffect } from "react";
import * as S from "../reports/ReportStyled";
import API from "../../../utils/Api";
import Loader from "../../common/loader";
import { useHistory } from "react-router-dom";

const Retailer = () => {
  let history = useHistory();

  const [data, setdata] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);

    let response = await API.get("retailer/RetailerListWithBalance", { headers: { Token: localStorage.getItem("token") } });
    setdata(response.data.data.results);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <S.Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <S.TableWrapper style={{ marginTop: "20px" }}>
          <S.Table>
            <S.TableRow>
              <S.TableHeader>Retailer Name</S.TableHeader>
              <S.TableHeader>Mobile Number</S.TableHeader>
              <S.TableHeader>Total Transactions</S.TableHeader>
              <S.TableHeader>Closing Balance</S.TableHeader>
            </S.TableRow>
            <S.TableBody>
              {data.map((e) => (
                <S.TableRow onClick={() => history.push({ pathname: "/home/retailer/bill", state: { id: e.id } })}>
                  <S.TableData>{e.retailerName}</S.TableData>
                  <S.TableData>{e.mobileNumber}</S.TableData>
                  <S.TableData>{e.totalTransactions}</S.TableData>
                  <S.TableData>{e.closingBalance}</S.TableData>
                </S.TableRow>
              ))}
            </S.TableBody>
          </S.Table>
        </S.TableWrapper>
      )}
    </S.Wrapper>
  );
};

export default Retailer;
