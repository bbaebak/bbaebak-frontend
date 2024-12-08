import { UpdateValueTypes } from 'app/types/create';
import { getRequest, instance, patchRequest, postRequest } from '.';

// 약속 생성
export const postBbaebak = async () => {
  const response = await postRequest('/api/v1/bbaebak');
  return response;
};

// 약속 정보 업데이트
export const updateBbaebak = async (params: UpdateValueTypes, id: string) => {
  const response = await patchRequest(`/api/v1/bbaebak/${id}`, params);
  return response;
};

// 메이커 서명
export const postMakerSign = async ({
  isSigned,
  id,
}: {
  isSigned: boolean;
  id: string;
}) => {
  const response = await patchRequest(`/api/v1/bbaebak/${id}/sign`, isSigned);
  return response;
};

// 메이트 서명
export const postMateSign = async (
  isSigned: boolean,
  id: string,
  mateId: string
) => {
  const response = await patchRequest(
    `/bbaebak/${id}/sign/:${mateId}`,
    isSigned
  );
  return response;
};

// 약속 삭제
export const deleteBbaebak = async (id: string) => {
  const response = await instance.delete(`/api/v1/bbaebak/${id}`);
  return response;
};

// 약속 리스트 조회
export const getBbaebakList = async () => {
  const response = await getRequest('/api/v1/bbaebak');
  return response;
};

// 약속 상세 조회
export const getBbaebakDetail = async (id: string) => {
  const response = await getRequest(`/api/v1/bbaebak/${id}`);
  return response;
};
