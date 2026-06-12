const BangladeshFlag = () => {
    return (
        <>
            <style>
                {`
          @keyframes wave {
            0% {
              transform: perspective(500px) rotateY(0deg);
            }
            25% {
              transform: perspective(500px) rotateY(-8deg);
            }
            50% {
              transform: perspective(500px) rotateY(0deg);
            }
            75% {
              transform: perspective(500px) rotateY(8deg);
            }
            100% {
              transform: perspective(500px) rotateY(0deg);
            }
          }

          @keyframes shadowMove {
            0%, 100% {
              filter: brightness(1);
            }
            50% {
              filter: brightness(1.15);
            }
          }
        `}
            </style>

            <div className="flex items-center">
                {/* Flag */}
                <div
                    className="
            relative
            w-[28px]
            h-[15px]
            bg-[#006a4e]
            origin-left
            overflow-hidden
            shadow-xl
          "
                    style={{
                        animation: "wave 2s ease-in-out infinite, shadowMove 2s ease-in-out infinite",
                    }}
                >
                    {/* Red Circle */}
                    <div
                        className="
              absolute
              top-1/2
              left-[45%]
              -translate-x-1/2
              -translate-y-1/2
              w-[9px]
              h-[9px]
              bg-[#f42a41]
              rounded-full
            "
                    />
                </div>
            </div>
        </>
    );
};

export default BangladeshFlag;