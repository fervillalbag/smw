import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/solid";
import * as Dialog from "@radix-ui/react-dialog";

import { client } from "../../../supabase/client";
import { Text, Button } from "../../ui";
import Line from "../Loader/Line";

interface CardProductProps {
  id: number;
  title: string;
  images: string[];
  price: number;
  currency: number;
  typeAd: number;
}

const CardProduct: React.FC<CardProductProps> = ({
  id,
  title,
  images,
  price,
  currency,
  typeAd,
}: CardProductProps) => {
  const navigate = useNavigate();
  const [currencies, setCurrencies] = useState<any | null>(null);
  const [showModalRecommended, setShowModalRecommended] =
    useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { data: currencies, error: errorCurrencies } =
        await client.from("CurrencyProduct").select("*");

      if (errorCurrencies) {
        console.log("No se encontraron monedas");
        return;
      }

      setCurrencies(currencies);
    })();
  }, []);

  const currencyProduct = currencies?.find(
    (currencyData: any) => currencyData.id === currency
  );

  const urlImage1 = images[0]?.split("upload");
  const urlImage2 = `${urlImage1[0]}upload/w_1400,h_1400,c_crop${urlImage1[1]}`;

  return (
    <div className="relative w-[150px]">
      {typeAd === 3 && (
        <div
          className="absolute grid place-items-center top-2 left-2 w-8 h-8 bg-white rounded-md shadow-@sura-primary-400 shadow-sm overflow-hidden"
          onClick={() => setShowModalRecommended(true)}
        >
          <StarIcon className="w-5 h-5 text-@sura-primary-900" />
        </div>
      )}

      <Dialog.Root open={showModalRecommended}>
        <Dialog.Portal>
          <Dialog.Overlay
            onClick={() => setShowModalRecommended(false)}
            className="z-[1500] bg-black data-[state=open]:animate-overlayShow fixed inset-0 opacity-50"
          />
          <Dialog.Content className="z-[2000] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Text className="leading-7">
              Este producto es destacado por un anunciante. Esto
              significa que ha sido promocionado por un socio
              comercial y no constituye una recomendación
              independiente de nuestra parte
            </Text>

            <div className="flex justify-end mt-4">
              <Button
                className="w-max px-8 h-[46px]"
                onClick={() => setShowModalRecommended(false)}
              >
                Cerrar
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <button className="z-10 absolute top-2 right-2 w-8 h-8 rounded-full grid place-items-center bg-white shadow-xl">
        <img
          src="/icons/heart-no-like.svg"
          alt=""
          className="object-contain"
        />
      </button>

      <div onClick={() => navigate(`/product/${id}`)}>
        <div>
          <img
            src={urlImage2}
            alt=""
            className="w-full h-40 object-cover rounded-md"
          />
        </div>

        <div>
          <Text className="text-@sura-primary-900 mt-1">
            {title.length >= 16 ? `${title.slice(0, 16)}..` : title}
          </Text>
          <span className="font-extrabold mt-[2px] text-@sura-primary-700">
            {!currencyProduct || !currencies ? (
              <div>
                <Line width={112} height={24} rounded="sm" />
              </div>
            ) : (
              <div className="relative">
                <div
                  className="absolute top-0 left-0 bg-transparent z-10 w-full h-full"
                  aria-hidden="true"
                />
                <NumericFormat
                  className="w-32"
                  prefix={`${currencyProduct?.name.toString()} `}
                  value={price}
                  thousandSeparator={true}
                />
              </div>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
