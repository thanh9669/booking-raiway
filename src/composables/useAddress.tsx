import { ADDRESS, PROVINCE, DISTRICT, WARD } from '@/types/index'
import { useState } from 'react'
import employer from '@/configs/employer'
import ModulesApi from '@/api/moduleApi'

const useAddress = () => {
    const [address, setAddress] = useState<ADDRESS>();
    const { authApi } = ModulesApi()
    const [addressRoot, setAddressRoot] = useState<ADDRESS>();
    const [ provinces, setProvinces ] = useState<PROVINCE[]>();
    const [ districts, setDistricts ] = useState<DISTRICT[]>();
    const [ wards, setWards ] = useState<WARD[]>();
    const add = localStorage.getItem(employer.CONFIGS)
    let configs = add ? JSON.parse(add) : {};
    const fetchAddress = async () => {
        let resultAll = { ...configs?.address };
        if (!configs?.address) {
            const result = await authApi.address();
            configs = { address:result?.data?.data }
            localStorage.setItem(employer.CONFIGS, JSON.stringify(configs))
            resultAll = { ...result?.data?.data }
            
        }
        setAddressRoot(resultAll);
        resultAll.provinces = configs?.address?.provinces.map((item) => {
            item.id = item.province_id
            return item
        })
        const provinces = [ ...resultAll?.provinces ];
        provinces.unshift({
            id: '', 
            name: "Lựa chọn tỉnh/thành phố",
            type: "",
        });
        const districts = [{
            id: '', 
            name: "Lựa chọn quận/huyện", 
            province_id: "0", 
            type: ""
        }]
        const wards = [{
            id: '', 
            name: "Lựa chọn xã/phường", 
            district_id: "0", 
            type: ""
        }]
        const result = {
            provinces: provinces,
            districts: districts,
            wards: wards,
        }
        setProvinces(provinces)
        setDistricts(districts)
        setWards(wards)
        setAddress(result);
        
    };

    const setDistrict = (id: string) => {
        const result: ADDRESS = {
            provinces: address?.provinces || [],
            districts: address?.districts || [],
            wards: address?.wards || []
        }
        result.districts = [{
            id: '', 
            name: "Lựa chọn quận/huyện", 
            province_id: "0", 
            type: ""
        }]
        result.wards = [{
            id: '', 
            name: "Lựa chọn xã/phường", 
            district_id: "0", 
            type: ""
        }]
        setWards(result.wards)
        const districts = addressRoot?.districts.filter(item=> {
            return item?.province_id === id
        })
        if (districts?.length) {
            result.districts.push(...districts)
        }
        setDistricts(result.districts)
        setAddress(result)
        return districts
    };

    const setWard = (id: string) => {
        const result: ADDRESS = {
            provinces: address?.provinces || [],
            districts: address?.districts || [],
            wards: address?.wards || []
        }
        const wards = addressRoot?.wards.filter(item=> {
            return item?.district_id == id
        })
        result.wards = [{
            id: '', 
            name: "Lựa chọn xã/phường", 
            district_id: "0", 
            type: ""
        }]
        if (wards?.length) {
            result.wards.push(...wards)
        }
        setWards(result.wards)
        setAddress(result)
        return wards
    };

    const getProvinceName = (id: string) => {
        return addressRoot?.provinces.find(item => {
            return item?.id.toString() == id
        })
    }
    const getDistrictName = (id: string) => {
        return addressRoot?.districts.find(item => {
            return item?.id.toString() == id
        })
    }
    const getWardName = (id: string) => {
        return addressRoot?.wards.find(item => {
            return item?.id.toString() == id
        })
    }
    // Hook trả về dữ liệu địa chỉ, hàm fetch và set
    return {
        address,
        addressRoot,
        provinces,
        districts,
        wards,
        fetchAddress,
        setDistrict,
        setWard,
        getProvinceName,
        getDistrictName,
        getWardName
    };
};

export default useAddress