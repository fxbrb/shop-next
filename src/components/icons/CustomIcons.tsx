import { ComponentPropsWithoutRef } from "react";

type SvgProps = ComponentPropsWithoutRef<"svg">;

const Icons = {
  logo: (props: SvgProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="500"
      height="500"
      viewBox="0 0 500 500"
      version="1.1"
      className="object-cover size-full"
      {...props}
    >
      <path
        d="M 162.500 206.739 C 160.300 207.638, 155.575 210.148, 152 212.316 C 138.124 220.732, 128.328 229.512, 110.369 249.630 C 102.332 258.633, 95.644 266, 95.507 266 C 95.370 266, 96.999 260.712, 99.127 254.250 C 103.143 242.050, 103.624 239.504, 102.090 238.556 C 100.263 237.427, 97.974 239.337, 91.876 247.079 C 88.452 251.426, 85.500 254.833, 85.316 254.650 C 85.133 254.466, 86.286 251.432, 87.880 247.908 C 91.744 239.365, 95 228.590, 95 224.345 C 95 210.031, 78.381 208.060, 54.214 219.509 C 41.615 225.477, 32.688 231.569, 25.405 239.171 C 19.067 245.785, 15.163 253.463, 16.484 256.712 C 17.126 258.289, 17.328 258.205, 18.202 256 C 22.933 244.054, 27.718 238.205, 39.307 230.206 C 61.969 214.563, 83.671 208.982, 89.497 217.299 C 94.573 224.546, 87.779 243.548, 67.087 279.975 C 63.189 286.837, 60 292.799, 60 293.225 C 60 293.651, 60.663 294, 61.474 294 C 62.285 294, 65.727 289.837, 69.123 284.750 C 78.371 270.897, 97.283 244.949, 97.774 245.440 C 98.010 245.677, 96.521 251.263, 94.464 257.854 C 90.967 269.057, 90.563 273, 92.914 273 C 93.451 273, 97.853 268.391, 102.695 262.758 C 124.255 237.679, 140.393 222.938, 157.295 212.883 C 165.958 207.729, 168.680 207.002, 169.667 209.575 C 170.725 212.333, 168.065 218.969, 157.270 240.500 C 146.124 262.731, 138.400 276.648, 128.844 291.714 C 123.124 300.732, 122.123 303, 123.862 303 C 125.727 303, 150.540 262.400, 160.068 243.758 C 172.627 219.184, 175.617 209.387, 171.478 206.360 C 169.119 204.636, 167.474 204.705, 162.500 206.739 M 280.500 211.933 C 269.745 213.698, 260.843 217.074, 258.041 220.451 C 256.227 222.637, 257.571 223.686, 259.744 221.781 C 266.041 216.260, 275.415 213.978, 294.500 213.321 C 318.723 212.488, 335.488 216.037, 341.592 223.291 C 345.029 227.376, 344.209 230.317, 338.006 236.159 C 330.019 243.680, 309.850 252.578, 279.225 262.092 C 273.574 263.847, 268.687 265.020, 268.365 264.698 C 268.043 264.377, 272.144 255.722, 277.477 245.466 C 284.944 231.109, 286.752 226.898, 285.337 227.160 C 284.094 227.390, 280.269 233.699, 273.500 246.688 C 264.606 263.755, 263.263 265.819, 261.359 265.357 C 260.182 265.072, 258.918 265.324, 258.550 265.919 C 258.183 266.514, 258.246 267.007, 258.691 267.015 C 262.347 267.085, 261.758 269.190, 253.013 287.308 C 248.056 297.579, 244 306.661, 244 307.491 C 244 310.545, 246.171 308.867, 248.193 304.250 C 253.817 291.408, 264.952 269, 265.710 269 C 267.157 269, 294.277 276.461, 318.500 283.522 C 345.875 291.503, 352.189 293.116, 351.464 291.942 C 350.647 290.620, 309.036 278.280, 277 269.857 L 268.500 267.623 273.500 266.178 C 317.940 253.337, 347 238.293, 347 228.128 C 347 223.544, 345.606 221.440, 340.645 218.532 C 332.579 213.805, 322.288 211.876, 303 211.476 C 293.375 211.276, 283.250 211.482, 280.500 211.933 M 214.954 259.086 C 214.340 260.233, 214.046 261.379, 214.300 261.633 C 214.902 262.236, 218 259.134, 218 257.929 C 218 256.239, 216.089 256.965, 214.954 259.086 M 411.607 258.582 C 410.548 261.341, 410.910 262.320, 412.500 261 C 414.137 259.641, 414.538 257, 413.107 257 C 412.616 257, 411.941 257.712, 411.607 258.582 M 341.035 262.935 C 340.336 264.240, 340.325 265.724, 341 267.500 C 342.334 271.009, 342.521 270.627, 338 273.619 C 335.731 275.120, 334 277.066, 334 278.114 C 334 280.710, 338.295 281.542, 342.793 279.817 C 346.183 278.518, 346.500 278.066, 346.500 274.538 C 346.500 271.014, 346.846 270.520, 350.500 268.823 C 354.082 267.160, 354.187 267.017, 351.500 267.459 C 349.850 267.730, 347.546 268.225, 346.379 268.559 C 344.688 269.043, 344.125 268.633, 343.599 266.537 C 342.722 263.045, 343.618 261.725, 346 263 C 347.822 263.975, 349.596 262.929, 348.306 261.639 C 346.869 260.202, 342.037 261.063, 341.035 262.935 M 168.052 264.208 C 163.662 267.195, 160.569 271.436, 161.332 273.422 C 162.125 275.490, 165.934 275.435, 168.965 273.312 C 170.674 272.115, 171.490 271.970, 171.771 272.812 C 172.449 274.848, 177.750 274.119, 180.694 271.585 C 182.237 270.257, 183.161 268.830, 182.746 268.414 C 182.331 267.999, 180.952 268.636, 179.682 269.829 C 176.637 272.690, 175 272.575, 175 269.500 C 175 266.317, 173.551 266.342, 169.279 269.601 C 164.553 273.205, 163.696 271.583, 168.162 267.490 C 170.837 265.039, 172.416 264.296, 174.043 264.721 C 175.665 265.146, 176.143 264.924, 175.806 263.902 C 175.053 261.620, 171.658 261.754, 168.052 264.208 M 189.075 267.678 C 187.384 270.800, 186 273.725, 186 274.178 C 186 276.062, 187.897 274.756, 190.394 271.153 C 193.773 266.277, 197.724 263.935, 199.023 266.038 C 199.699 267.130, 200.199 267.201, 201.071 266.329 C 203.038 264.362, 201.031 262.733, 197.373 263.327 C 195.518 263.628, 194 263.453, 194 262.937 C 194 260.478, 191.858 262.539, 189.075 267.678 M 232.241 263.974 C 228.525 266.263, 224.907 271.595, 225.688 273.631 C 226.454 275.625, 230.341 275.306, 233.262 273.009 C 235.399 271.328, 235.882 271.250, 236.365 272.509 C 237.252 274.820, 242.347 274.324, 244.826 271.686 C 247.832 268.485, 247.553 267.420, 244.365 269.927 C 240.831 272.708, 239 272.562, 239 269.500 C 239 268.125, 238.502 267, 237.894 267 C 237.286 267, 235.452 268.125, 233.818 269.500 C 230.656 272.160, 228.416 272.822, 229.590 270.750 C 231.565 267.261, 234.581 265, 237.258 265 C 239.138 265, 240.021 264.558, 239.755 263.750 C 239.087 261.720, 235.736 261.820, 232.241 263.974 M 364.454 264.431 C 359.961 267.139, 357.396 270.984, 358.376 273.539 C 359.121 275.478, 363.397 274.838, 366.126 272.379 C 367.558 271.089, 367.824 271.099, 368.345 272.457 C 369.361 275.104, 374.325 274.314, 377.500 271 C 380.990 267.358, 379.922 267.046, 375.810 270.507 C 372.448 273.336, 371 273.015, 371 269.441 C 371 266.332, 369.910 266.364, 366.081 269.585 C 361.321 273.591, 359.850 271.906, 364.357 267.610 C 367.176 264.922, 368.755 264.105, 370.225 264.571 C 371.654 265.025, 372.106 264.818, 371.785 263.855 C 371.052 261.654, 368.761 261.834, 364.454 264.431 M 387.744 264.143 C 381.026 275.118, 381.117 278.048, 387.924 269.975 C 391.720 265.473, 396 263.366, 396 266 C 396 266.550, 396.450 267, 397 267 C 397.550 267, 398 266.041, 398 264.869 C 398 263.007, 397.574 262.807, 394.618 263.287 C 392.758 263.589, 390.775 263.375, 390.211 262.811 C 389.511 262.111, 388.729 262.534, 387.744 264.143 M 429.411 263.891 C 425.927 266.016, 422 270.613, 422 272.567 C 422 274.936, 425.917 275.246, 429.458 273.157 C 432.250 271.510, 432.943 271.408, 433.392 272.579 C 433.692 273.361, 435.051 274, 436.413 274 C 439.102 274, 444.944 269.615, 443.792 268.461 C 443.403 268.070, 441.677 268.935, 439.958 270.382 C 436.400 273.376, 434.709 273.009, 435.605 269.439 C 436.405 266.249, 434.655 266.271, 430.818 269.500 C 425.774 273.744, 424.024 272.249, 428.636 267.636 C 431.311 264.962, 432.125 264.630, 435.242 264.946 C 436.442 265.068, 436.798 264.637, 436.385 263.562 C 435.587 261.482, 433.174 261.596, 429.411 263.891 M 320.073 266.635 C 317.320 270.135, 317.455 272.794, 320.455 274.161 C 323.822 275.696, 328.629 273.619, 330.620 269.769 C 332.848 265.459, 331.833 264, 326.604 264 C 322.978 264, 321.758 264.492, 320.073 266.635 M 210.557 267.223 C 209.701 268.445, 209 270.695, 209 272.223 C 209 274.363, 209.474 275, 211.066 275 C 214.651 275, 222 270.061, 222 267.651 C 222 267.101, 220.988 267.600, 219.750 268.759 C 217.245 271.106, 212.512 273.178, 211.643 272.309 C 211.333 272, 211.737 270.476, 212.540 268.923 C 214.251 265.614, 214.332 265, 213.057 265 C 212.538 265, 211.413 266, 210.557 267.223 M 323.669 267.046 C 320.758 269.335, 320.067 273, 322.545 273 C 323.395 273, 325.229 271.862, 326.619 270.472 C 330.803 266.288, 328.312 263.394, 323.669 267.046 M 406.534 268.570 C 404.543 272.764, 405.088 275, 408.101 275 C 410.754 275, 416.591 271.509, 417.381 269.449 C 417.783 268.402, 416.572 268.752, 413.435 270.591 C 408.381 273.553, 407.114 273.240, 408.838 269.457 C 410.228 266.406, 410.315 265, 409.114 265 C 408.627 265, 407.466 266.606, 406.534 268.570 M 339.479 275.494 L 336.500 277.928 339.781 277.964 C 341.863 277.987, 343.283 277.427, 343.664 276.433 C 344.789 273.501, 342.536 272.996, 339.479 275.494"
        stroke="currentColor"
        fill="currentColor"
        fill-rule="evenodd"
      />
      <path
        d="M 112 187.480 C 112 188.293, 113.718 189.836, 115.817 190.907 C 117.916 191.978, 120.150 193.476, 120.782 194.237 C 121.553 195.167, 121.966 202.270, 122.041 215.923 L 122.153 236.227 125.193 233.364 L 128.232 230.500 127.665 218.750 C 127.354 212.287, 127.242 207, 127.417 207 C 127.591 207, 129.189 210.853, 130.966 215.562 C 134.131 223.948, 134.160 224.169, 132.349 226.278 C 131.332 227.463, 132.736 226.504, 135.469 224.148 C 140.859 219.499, 151.134 212.483, 157.485 209.114 C 159.677 207.951, 160.802 206.997, 159.985 206.994 C 159.024 206.990, 157.312 203.729, 155.130 197.744 C 153.277 192.660, 151.309 187.938, 150.758 187.250 C 150.019 186.330, 144.778 186, 130.878 186 C 114.879 186, 112 186.226, 112 187.480 M 222.137 187.744 C 221.593 188.761, 215.671 204.872, 208.978 223.547 C 202.286 242.221, 196.177 258.807, 195.405 260.404 C 194.632 262.001, 194 263.373, 194 263.452 C 194 264.198, 201.670 263.250, 201.699 262.500 C 201.743 261.353, 221.010 207.715, 221.603 207.086 C 222.520 206.116, 221.905 308.120, 220.980 310.554 C 220.362 312.178, 218.497 313.780, 216.006 314.826 C 213.814 315.747, 212.016 317.063, 212.010 317.750 C 212.002 318.717, 217.661 319, 237 319 C 257.780 319, 262 318.763, 262 317.598 C 262 316.827, 260.735 315.755, 259.190 315.216 C 254.311 313.515, 253.001 311.397, 252.985 305.179 C 252.962 296.598, 251.769 295.977, 248.750 302.974 C 247.320 306.288, 245.666 309, 245.075 309 C 243.204 309, 243.880 306.544, 248.410 296.895 L 252.820 287.500 252.946 241.739 C 253.015 216.571, 253.335 195.289, 253.659 194.447 C 253.982 193.604, 256.021 192.010, 258.189 190.904 C 265.351 187.250, 262.891 186.525, 242.231 186.197 C 224.495 185.916, 223.056 186.027, 222.137 187.744 M 270.696 186.637 C 269.289 188.044, 270.099 188.950, 274.504 190.899 C 279.956 193.311, 281 195.607, 281 205.190 L 281 212.250 284.125 211.625 C 285.844 211.281, 292.594 211, 299.125 211 L 311 211 311 200.855 L 311 190.709 320.750 191.272 C 332.030 191.922, 336.490 193.516, 340.812 198.439 C 345.130 203.357, 346.970 210.375, 346.909 221.691 C 346.858 231.114, 346.843 231.168, 343.215 235.326 C 339.848 239.184, 339.816 239.278, 342.786 236.563 C 346.774 232.918, 346.837 234.009, 343.021 240.662 C 340.653 244.791, 339.004 246.322, 334.780 248.318 C 329.619 250.756, 315.826 253.119, 319 251.022 C 321.539 249.344, 319.127 249.895, 315.210 251.887 C 313.170 252.925, 304.637 256.134, 296.250 259.017 C 281.343 264.142, 281 264.324, 281 267.130 C 281 268.726, 280.445 270.028, 279.750 270.062 C 278.839 270.108, 309.106 278.810, 310.750 278.975 C 310.887 278.989, 311 273.825, 311 267.500 L 311 256 317.474 256 C 323.671 256, 324.016 256.130, 325.515 259.029 C 326.377 260.696, 326.812 262.496, 326.482 263.029 C 326.152 263.563, 327.048 264, 328.472 264 C 331.534 264, 332.592 266.026, 331.042 268.922 C 330.302 270.305, 330.276 271, 330.965 271 C 331.534 271, 332.007 271.563, 332.015 272.250 C 332.024 272.938, 332.439 274.145, 332.938 274.934 C 333.692 276.126, 334.534 275.912, 337.923 273.670 C 342.529 270.622, 342.335 271.011, 341 267.500 C 339.585 263.778, 341.285 261, 344.976 261 C 347.847 261, 349.514 262.152, 348.341 263.325 C 348.009 263.658, 346.924 263.494, 345.929 262.962 C 343.613 261.722, 342.730 263.077, 343.599 266.537 C 344.125 268.633, 344.688 269.043, 346.379 268.559 C 347.546 268.225, 349.850 267.728, 351.500 267.455 C 354.096 267.025, 353.935 267.222, 350.303 268.916 C 346.297 270.784, 346.132 271.036, 346.683 274.433 C 347.230 277.805, 347.059 278.077, 343.461 279.581 C 341.371 280.454, 338.647 280.975, 337.408 280.738 C 335.238 280.323, 335.214 280.396, 336.748 282.739 C 338.115 284.824, 338.139 285.314, 336.921 286.180 C 335.756 287.007, 335.793 287.096, 337.128 286.672 C 338.024 286.389, 339.149 286.516, 339.628 286.955 C 340.108 287.395, 342.857 288.519, 345.738 289.454 C 352.820 291.751, 353.324 293.127, 346.504 291.542 C 343.477 290.838, 341 290.639, 341 291.098 C 341 291.558, 343.894 298.024, 347.430 305.467 L 353.861 319 371.930 319 C 383.060 319, 390 318.624, 390 318.020 C 390 317.482, 388.313 316.175, 386.250 315.118 C 380.533 312.186, 378.864 309.818, 370.025 292.107 C 363.653 279.338, 362.138 275.518, 363.172 274.827 C 364.015 274.264, 363.498 274.172, 361.759 274.576 C 358.462 275.341, 356.989 272.848, 358.916 269.763 C 359.593 268.678, 359.751 268.036, 359.267 268.335 C 358.782 268.635, 356.526 265.130, 354.254 260.547 L 350.121 252.215 356.529 249.061 C 382.038 236.502, 384.065 205.907, 360.228 193.202 C 349.359 187.409, 345.097 186.869, 306.446 186.382 C 287.166 186.140, 271.079 186.254, 270.696 186.637 M 152.405 215.834 C 145.475 220.333, 131 231.729, 131 232.686 C 131 233.051, 132.114 232.302, 133.476 231.022 C 135.924 228.723, 135.961 228.720, 136.726 230.733 C 137.152 231.853, 139.750 238.851, 142.500 246.283 L 147.500 259.795 156.675 241.660 C 161.747 231.635, 165.500 223.072, 165.066 222.512 C 164.634 221.956, 163.482 219.363, 162.505 216.750 C 161.528 214.137, 160.184 212, 159.519 212 C 158.854 212, 155.653 213.725, 152.405 215.834 M 77.762 213.707 C 79.006 213.946, 80.806 213.937, 81.762 213.687 C 82.718 213.437, 81.700 213.241, 79.500 213.252 C 77.300 213.263, 76.518 213.468, 77.762 213.707 M 283.250 213.706 C 281.123 214.115, 281 214.614, 281 222.792 C 281 230.909, 281.096 231.307, 282.557 229.223 C 283.413 228, 284.769 227, 285.571 227 C 286.671 227, 286.274 228.496, 283.953 233.093 C 281.117 238.711, 280.863 240.059, 280.689 250.407 L 280.500 261.629 287.500 259.427 C 297.507 256.279, 313.727 250.144, 312.250 250.066 C 311.299 250.016, 311 245.713, 311 232.073 C 311 215.841, 311.165 214.103, 312.750 213.689 C 314.976 213.108, 286.273 213.124, 283.250 213.706 M 164.431 235.175 C 162.819 238.565, 158.757 246.412, 155.404 252.614 L 149.307 263.891 159.810 291.491 L 170.313 319.090 175.773 318.795 L 181.233 318.500 190.264 293.502 C 195.231 279.754, 200.016 267.908, 200.898 267.178 C 201.779 266.449, 201.887 266.168, 201.138 266.554 C 200.382 266.944, 199.397 266.643, 198.923 265.878 C 198.210 264.727, 197.610 264.777, 195.285 266.179 C 193.753 267.102, 192.355 268.796, 192.179 269.943 C 192.002 271.091, 191.470 271.791, 190.998 271.499 C 190.525 271.206, 189.813 271.494, 189.415 272.138 C 188.963 272.869, 189.124 273.041, 189.845 272.595 C 191.501 271.572, 191.233 273.865, 189.156 278.491 L 187.363 282.481 186.224 279.213 C 185.597 277.415, 185.367 275.208, 185.712 274.308 C 186.113 273.263, 185.943 272.917, 185.242 273.350 C 184.627 273.730, 183.860 273.135, 183.500 271.999 L 182.855 269.969 180.293 271.984 C 177.504 274.178, 172.398 274.695, 171.782 272.847 C 171.518 272.055, 170.569 272.236, 168.757 273.424 C 165.625 275.476, 161.648 275.172, 161.206 272.847 C 160.479 269.033, 170.744 260.920, 174.482 262.355 C 176.824 263.253, 176.317 265.316, 173.909 264.686 C 172.445 264.304, 170.722 265.144, 168.162 267.490 C 163.696 271.583, 164.553 273.205, 169.279 269.601 C 173.551 266.342, 175 266.317, 175 269.500 C 175 272.540, 177.014 272.747, 179.532 269.965 C 180.545 268.845, 182.077 268.171, 182.937 268.467 C 184.336 268.948, 184.339 268.873, 182.968 267.752 C 181.714 266.728, 173.312 246.129, 168.490 232.256 L 167.362 229.012 164.431 235.175 M 25.462 238.250 L 20.500 243.500 25.750 238.538 C 30.628 233.926, 31.459 233, 30.712 233 C 30.554 233, 28.192 235.363, 25.462 238.250 M 124.750 238.738 L 122 241.609 122 270.805 C 122 286.862, 122.383 300, 122.851 300 C 123.318 300, 125.115 297.726, 126.843 294.946 C 128.571 292.166, 129.546 290.163, 129.008 290.495 C 128.384 290.881, 127.936 281.130, 127.766 263.483 L 127.500 235.867 124.750 238.738 M 114.946 243.750 L 111.500 247.500 115.250 244.054 C 117.313 242.158, 119 240.471, 119 240.304 C 119 239.540, 118.154 240.260, 114.946 243.750 M 116.437 247.250 L 113.500 250.500 116.750 247.563 C 119.779 244.825, 120.460 244, 119.687 244 C 119.515 244, 118.052 245.463, 116.437 247.250 M 107.437 257.250 L 104.500 260.500 107.750 257.563 C 110.779 254.825, 111.460 254, 110.687 254 C 110.515 254, 109.052 255.463, 107.437 257.250 M 232.241 263.974 C 228.525 266.263, 224.907 271.595, 225.688 273.631 C 226.454 275.625, 230.341 275.306, 233.262 273.009 C 235.399 271.328, 235.882 271.250, 236.365 272.509 C 237.252 274.820, 242.347 274.324, 244.826 271.686 C 247.832 268.485, 247.553 267.420, 244.365 269.927 C 240.831 272.708, 239 272.562, 239 269.500 C 239 268.125, 238.502 267, 237.894 267 C 237.286 267, 235.452 268.125, 233.818 269.500 C 230.656 272.160, 228.416 272.822, 229.590 270.750 C 231.565 267.261, 234.581 265, 237.258 265 C 239.138 265, 240.021 264.558, 239.755 263.750 C 239.087 261.720, 235.736 261.820, 232.241 263.974 M 395.689 262.648 C 396.892 262.909, 398.104 263.883, 398.381 264.811 C 398.744 266.027, 398.828 265.939, 398.682 264.500 C 398.545 263.142, 397.680 262.447, 395.990 262.336 C 393.903 262.199, 393.854 262.249, 395.689 262.648 M 368.792 264.724 C 369.794 265.089, 369.819 265.514, 368.900 266.620 C 367.950 267.766, 368.023 267.929, 369.271 267.449 C 370.255 267.072, 371.017 267.522, 371.348 268.677 C 371.795 270.238, 371.847 270.212, 371.710 268.500 C 371.622 267.400, 371.833 266.050, 372.179 265.500 C 372.534 264.935, 371.653 264.446, 370.154 264.377 C 368.694 264.309, 368.081 264.465, 368.792 264.724 M 389.437 268.250 L 386.500 271.500 389.995 268.500 C 391.917 266.850, 393.680 265.387, 393.912 265.250 C 394.144 265.113, 393.893 265, 393.354 265 C 392.815 265, 391.052 266.462, 389.437 268.250 M 375.924 269.750 L 373.500 272.500 376.500 270 C 378.150 268.625, 379.688 267.387, 379.917 267.250 C 380.146 267.113, 379.887 267, 379.341 267 C 378.795 267, 377.258 268.238, 375.924 269.750 M 416.543 267.931 C 415.860 269.036, 417.437 270.230, 418.361 269.306 C 419.311 268.355, 419.134 267, 418.059 267 C 417.541 267, 416.859 267.419, 416.543 267.931 M 431.673 271.721 C 430.898 272.975, 435.372 275.404, 437.151 274.695 C 437.925 274.387, 437.562 274.124, 436.300 274.079 C 435.090 274.036, 433.689 273.267, 433.188 272.372 C 432.675 271.455, 432.013 271.170, 431.673 271.721 M 280.811 291.963 C 280.468 312.882, 280.328 313.351, 273.778 315.569 C 272.042 316.157, 270.444 317.169, 270.227 317.819 C 269.931 318.707, 276.306 319, 295.917 319 C 317.068 319, 322 318.746, 322 317.658 C 322 316.920, 320.253 315.793, 318.119 315.154 C 311.784 313.256, 311.500 312.438, 311.500 296.099 L 311.500 281.500 299 277.909 C 292.125 275.934, 285.290 274.019, 283.811 273.655 L 281.121 272.992 280.811 291.963 M 339.479 275.494 L 336.500 277.928 339.781 277.964 C 341.863 277.987, 343.283 277.427, 343.664 276.433 C 344.789 273.501, 342.536 272.996, 339.479 275.494 M 125.794 301.048 C 124.345 303.131, 123.933 303.274, 123.059 302 C 122.286 300.872, 122.027 301.644, 122.015 305.115 C 121.997 310.642, 119.358 314.543, 114.988 315.503 C 113.345 315.864, 112 316.798, 112 317.579 C 112 318.737, 114.514 319, 125.583 319 C 135.583 319, 139.063 318.688, 138.773 317.819 C 138.556 317.169, 136.958 316.157, 135.222 315.569 C 130.181 313.862, 128.766 311.735, 128.104 304.867 C 127.501 298.611, 127.496 298.602, 125.794 301.048"
        stroke="none"
        fill="#e190b5"
        fill-rule="evenodd"
      />
    </svg>
  ),

  tiktok: (props: SvgProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.8217 5.1344C16.0886 4.29394 15.6479 3.19805 15.6479 2H14.7293M16.8217 5.1344C17.4898 5.90063 18.3944 6.45788 19.4245 6.67608C19.7446 6.74574 20.0786 6.78293 20.4266 6.78293V10.2191C18.645 10.2191 16.9932 9.64801 15.6477 8.68211V15.6707C15.6477 19.1627 12.8082 22 9.32386 22C7.50043 22 5.85334 21.2198 4.69806 19.98C3.64486 18.847 2.99994 17.3331 2.99994 15.6707C2.99994 12.2298 5.75592 9.42509 9.17073 9.35079M16.8217 5.1344C16.8039 5.12276 16.7861 5.11101 16.7684 5.09914M6.9855 17.3517C6.64217 16.8781 6.43802 16.2977 6.43802 15.6661C6.43802 14.0734 7.73249 12.7778 9.32394 12.7778C9.62087 12.7778 9.9085 12.8288 10.1776 12.9124V9.40192C9.89921 9.36473 9.61622 9.34149 9.32394 9.34149C9.27287 9.34149 8.86177 9.36884 8.81073 9.36884M14.7244 2H12.2097L12.2051 15.7775C12.1494 17.3192 10.8781 18.5591 9.32386 18.5591C8.35878 18.5591 7.50971 18.0808 6.98079 17.3564"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  ),

  google: (props: SvgProps) => (
    <svg
      enable-background="new 0 0 48 48"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m43.611 20.083h-1.611v-.083h-18v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657c-3.572-3.329-8.35-5.382-13.618-5.382-11.045 0-20 8.955-20 20s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
        fill="#ffc107"
      />
      <path
        d="m6.306 14.691 6.571 4.819c1.778-4.402 6.084-7.51 11.123-7.51 3.059 0 5.842 1.154 7.961 3.039l5.657-5.657c-3.572-3.329-8.35-5.382-13.618-5.382-7.682 0-14.344 4.337-17.694 10.691z"
        fill="#ff3d00"
      />
      <path
        d="m24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238c-2.008 1.521-4.504 2.43-7.219 2.43-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025c3.31 6.477 10.032 10.921 17.805 10.921z"
        fill="#4caf50"
      />
      <path
        d="m43.611 20.083h-1.611v-.083h-18v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238c-.438.398 6.591-4.807 6.591-14.807 0-1.341-.138-2.65-.389-3.917z"
        fill="#1976d2"
      />
    </svg>
  ),
};

type IconName = keyof typeof Icons;

export type CustomIconsProps = {
  name: IconName;
  size?: number;
} & SvgProps;

export const CustomIcons = ({ name, size, ...props }: CustomIconsProps) => {
  const Icon = Icons[name];
  return <Icon {...props} height={size} width={size} />;
};
