"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormButton } from "src/shared/ui/form/form-button";
import UtilsStore from "src/shared/utils/utils-store";


export class AlertStore {
  static alertStore = UtilsStore.createStoreAlert();
}

export default function Alert() {
  const alert = AlertStore.alertStore();

  function handleCloseAlert(e: any) {
    e.preventDefault();
    alert.close();
  }


  return (
    <AnimatePresence>
      {alert.isValid && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseAlert}
          className="fixed inset-0 z-40 grid cursor-pointer place-items-center overflow-y-scroll bg-slate-900/20 p-8 backdrop-blur"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg cursor-default overflow-hidden rounded-lg bg-zinc-800 p-6 text-white shadow-xl"
          >
            <div className="flex flex-row justify-between">
              <div className="flex flex-col text-left">
                <h3 className="text-xl font-bold">Error</h3>
                <div className="my-2" />
                <p className="text-base font-semibold">
                  {alert.message}
                </p>
              </div>
              <div className="float-right">
                <FormButton onClick={handleCloseAlert} >Close</FormButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
