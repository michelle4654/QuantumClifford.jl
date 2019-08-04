var documenterSearchIndex = {"docs":
[{"location":"manual/#Manual-1","page":"Manual","title":"Manual","text":"","category":"section"},{"location":"manual/#","page":"Manual","title":"Manual","text":"DocTestSetup = quote\n    using SimpleClifford\nend","category":"page"},{"location":"manual/#Pauli-Operators-1","page":"Manual","title":"Pauli Operators","text":"","category":"section"},{"location":"manual/#","page":"Manual","title":"Manual","text":"They are stored in memory as a phase (a single byte where 0x0,0x1,0x2,0x3 corresponds to 1i-1-i) and two bit-arrays, for X and for Z components.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"You can create them with a P string.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> P\"-iXZ\"\n-iXZ","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"Or by specifying phase and X/Z components:","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> PauliOperator(0x0,Bool[0,1,0],Bool[0,0,1])\n+ _XZ","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"Both underscore and I can be used for identity.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> P\"I_XYZ\"\n+ __XYZ","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"Multiplication with scalars or other Pauli operators works as expected, as well as tensor products of Pauli operators.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> -1im*P\"X\"\n-iX\n\njulia> P\"X\" * P\"Z\"\n-iY\n\njulia> P\"X\" ⊗ P\"Z\"\n+ XZ","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"One can check for commutativity with comm.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> comm(P\"X\",P\"Z\")\n0x01\n\njulia> comm(P\"XX\",P\"ZZ\")\n0x00","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"And check the phase of a product with prodphase.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> prodphase(P\"X\", P\"Z\")\n0x03\n\njulia> prodphase(P\"X\", P\"iZ\")\n0x00\n\njulia> prodphase(P\"X\",P\"Y\")\n0x01","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"Indexing operations are available.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> p = P\"IXYZ\";\n\njulia> p[1], p[2], p[3], p[4]\n((false, false), (true, false), (true, true), (false, true))\n\njulia> p = P\"III\";\n\njulia> p[2] = (true, true);\n\njulia> p\n+ _Y_","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"Including various permutation methods and fancy indexing:","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> permute(P\"XYZ\", [3,1,2])\n+ ZXY\n\njulia> P\"IXYZ\"[[2,3]]\n+ XY","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"The operator is represented in memory by bit arrays (much denser than using byte arrays).","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> p = P\"-IXYZ\";\n\njulia> p.nqbits, p.phase, p.xz\n(4, 0x02, UInt64[0x0000000000000006, 0x000000000000000c])","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"The convenience properties xbit and zbit give you Bool (GF2) vectors. TODO: this should be a separate function.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> P\"XYZI\".xbit\n4-element BitArray{1}:\n 1\n 1\n 0\n 0","category":"page"},{"location":"manual/#Stabilizers-1","page":"Manual","title":"Stabilizers","text":"","category":"section"},{"location":"manual/#","page":"Manual","title":"Manual","text":"They are stored in memory as a phase list and a bit-matrix for X and Z components. They can be created by an S string, or with a number of different constructors.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> S\"-XX\n         +ZZ\"\n- XX\n+ ZZ\n\njulia> Stabilizer([P\"-XX\",P\"+ZZ\"])\n- XX\n+ ZZ\n\njulia> Stabilizer([0x2, 0x0],\n                  Bool[1 1;\n                       0 0],\n                  Bool[0 0;\n                       1 1])\n- XX\n+ ZZ","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"Direct sums can be performed,","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> S\"-XX\" ⊕ S\"ZZ\"\n- XX__\n+ __ZZ","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"Indexing operations are available, including fancy indexing. 2D indexing, into the Pauli operators is not implemented (TODO).","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> #TODO","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"Consistency at creation is not verified so nonsensical stabilizers can be created, both in terms of content and shape.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> S\"iX\n         +Z\"\n+iX\n+ Z","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"Similarly to the Pauli operators, a bit array representation is used.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> s = S\"-XXX\n             +ZZI\n             -IZZ\"\n- XXX\n+ ZZ_\n- _ZZ\n\njulia> s.phases, s.nqbits, s.xzs\n(UInt8[0x02, 0x00, 0x02], 3, UInt64[0x0000000000000007 0x0000000000000000; 0x0000000000000000 0x0000000000000003; 0x0000000000000000 0x0000000000000006])","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"And there are convenience functions that can extract the corresponding binary check matrix.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> stab_to_gf2(s)\n3×6 BitArray{2}:\n 1  1  1  0  0  0\n 0  0  0  1  1  0\n 0  0  0  0  1  1","category":"page"},{"location":"manual/#Canonicalization-of-Stabilizers-1","page":"Manual","title":"Canonicalization of Stabilizers","text":"","category":"section"},{"location":"manual/#","page":"Manual","title":"Manual","text":"Canonicalization (akin to Gaussian elimination over F(2,2)) is implemented.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> s = S\"-XXX\n             +ZZX\n             +III\";\n\njulia> canonicalize!(s)\n+ YY_\n+ ZZX\n+ ___","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"If phases are inconsequential, the operations can be faster by not tracking and updating them.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> s = S\"-XXX\n             +ZZX\n             +III\";\n\njulia> canonicalize!(s; phases=false)\n- YY_\n+ ZZX\n+ ___","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"These operations are in place (as customarily signified by \"!\").","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> s = S\"-XXX\n             +ZZX\n             +III\";\n\njulia> canonicalize!(s; phases=false);\n\njulia> s\n- YY_\n+ ZZX\n+ ___","category":"page"},{"location":"manual/#Projective-measurements-1","page":"Manual","title":"Projective measurements","text":"","category":"section"},{"location":"manual/#","page":"Manual","title":"Manual","text":"To observe the effect of different projections, we will start with a GHZ state.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> s = S\"-XXX\n             +ZZI\n             -IZZ\";","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"The project! function returns the new stabilizer, the index where the anticommutation was detected, and the result of the projection (nothing being an undetermined result). For instance here we project on an operator that does not commute with all stabilizer generators.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> project!(copy(s), P\"ZII\")\n(+ Z__\n+ ZZ_\n- _ZZ, 1, nothing)","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"Or we can project on a commuting operator, hence no anticommuting terms (the index is zero), and the result is perfectly determined (-1, or in our convention to represent the phase, 0x2).","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> project!(copy(s), P\"-ZZI\")\n(- XXX\n- Z_Z\n- _ZZ, 0, 0x02)","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"When the projection is consistent with the stabilizer (i.e. the mesurement result is not nothing), this would trigger an expensive canonicalization procedure in order to calculate the measurement result (unless we are using more advanced data structure to represent the state). If all you want to know is whether the projection is consistent with the stabilizer, but you do not care about the measurement result, you can skip the canonicalization and calculation of the result.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> project!(copy(s), P\"-ZZI\", keep_result=false)\n(- XXX\n+ ZZ_\n- _ZZ, 0, nothing)","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"Lastly, in either case, you can skip the calculation of the phases as well, if they are unimportant.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> project!(copy(s), P\"ZZI\", phases=false)\n(- XXX\n+ Z_Z\n- _ZZ, 0, 0x00)","category":"page"},{"location":"manual/#Generating-a-Pauli-operator-with-Stabilizer-generators-1","page":"Manual","title":"Generating a Pauli operator with Stabilizer generators","text":"","category":"section"},{"location":"manual/#","page":"Manual","title":"Manual","text":"i.e. checking for independence. This particular function requires the stabilizer to be already canonicalized.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> s = S\"-XXX\n             +ZZI\n             -IZZ\";\n\njulia> s = canonicalize!(s)\n- XXX\n- Z_Z\n- _ZZ","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"It modifies the Pauli operator in place, reducing it to identity if possible. The leftover phase is present to indicate if the phase itself could not have been canceled. The list of indices specifies which rows of the stabilizer were used to generated the desired Pauli operator.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> generate!(P\"XYY\", s)\n(- ___, [1, 3])","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"Phases can be neglected, for higher performance.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> generate!(P\"XYY\", s, phases=false)\n(+ ___, [1, 3])","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"If the Pauli operator can not be generated by the stabilizer, nothing value is returned.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> generate!(P\"ZZZ\", s)\n\njulia> generate!(P\"XZX\", s)\n\njulia> generate!(P\"YYY\", s)","category":"page"},{"location":"manual/#Clifford-Operators-1","page":"Manual","title":"Clifford Operators","text":"","category":"section"},{"location":"manual/#","page":"Manual","title":"Manual","text":"A number of predefined Clifford operators are available.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> Hadamard\nX ⟼ + Z\nZ ⟼ + X\n\njulia> Phase\nX ⟼ + Y\nZ ⟼ + Z\n\njulia> CNOT\nX_ ⟼ + XX\n_X ⟼ + _X\nZ_ ⟼ + Z_\n_Z ⟼ + ZZ\n\njulia> CliffordId\nX ⟼ + X\nZ ⟼ + Z","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"Chaining and tensor products are possible (but slow (TODO)). Same for qubit permutations.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> Hadamard ⊗ Phase\nX_ ⟼ + Z_\n_X ⟼ + _Y\nZ_ ⟼ + X_\n_Z ⟼ + _Z\n\njulia> Hadamard * Phase\nX ⟼ - Y\nZ ⟼ + X","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> permute(CNOT, [2,1])\nX_ ⟼ + X_\n_X ⟼ + XX\nZ_ ⟼ + ZZ\n_Z ⟼ + _Z","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"You can create custom Clifford operators with C-strings or with a list of Pauli operators. TODO: creating them by using a Stabilizer or by using boolean matrices.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> C\"-ZZ\n         +_Z\n         -X_\n         +XX\"\nX_ ⟼ - ZZ\n_X ⟼ + _Z\nZ_ ⟼ - X_\n_Z ⟼ + XX\n\njulia> CliffordOperator([P\"-ZZ\", P\"_Z\", P\"-X_\", P\"XX\"])\nX_ ⟼ - ZZ\n_X ⟼ + _Z\nZ_ ⟼ - X_\n_Z ⟼ + XX","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"Naturally, the operators can be applied to stabilizer states. This includes high performance in-place operations (and the phase can be neglected with phases=false for faster computation).","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> CNOT * S\"X_\"\n+ XX\n\njulia> s = S\"X_\";\n\njulia> apply!(s,CNOT)\n+ XX","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"TODO: Small Clifford operators can be applied to large stabilizers by specifying the qubit indices.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"Pauli operators act as Clifford operators too (but they are rather boring, as they only change signs).","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> P\"XII\" * S\"ZXX\"\n- ZXX","category":"page"},{"location":"manual/#Destabilizers-1","page":"Manual","title":"Destabilizers","text":"","category":"section"},{"location":"manual/#","page":"Manual","title":"Manual","text":"Slightly abusing the name: What we call \"destabilizers\" here is a stabilizer and its destabilizing operators saved together. They are initialized from a stabilizer.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> s=S\"-XXX\n           -ZZI\n           +IZZ\";\n\njulia> d = calculate_destabilizer(s)\n+ Z__\n+ X__\n+ _X_\n━━━━━\n- XXX\n- Z_Z\n+ _ZZ","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"With convenience properties to extract only the stabilizer and destabilizer pieces:","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> d.stabilizer\n- XXX\n- Z_Z\n+ _ZZ\n\njulia> d.destabilizer\n+ Z__\n+ X__\n+ _X_","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"Importantly commuting projections are much faster when tracking the destabilizer as canonicalization is not necessary.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> project!(d,P\"ZZI\")\n(+ Z__\n+ X__\n+ _X_\n━━━━━\n- XXX\n- Z_Z\n+ _ZZ, 0, 0x02)","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"Non-commuting projections are just as fast as when using only stabilizers.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> project!(d,P\"ZZZ\")\n(- XXX\n+ _XX\n+ X_X\n━━━━━\n+ ZZZ\n- Z_Z\n+ _ZZ, 1, nothing)","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"Clifford operations can be applied the same way they are applied to stabilizers.","category":"page"},{"location":"manual/#","page":"Manual","title":"Manual","text":"julia> apply!(d,CNOT⊗Hadamard)\n- X_Z\n+ _XZ\n+ XXZ\n━━━━━\n+ _ZX\n- Z_X\n+ ZZX","category":"page"},{"location":"manual/#TODO:-Mixed-Stabilizer-States-1","page":"Manual","title":"TODO: Mixed Stabilizer States","text":"","category":"section"},{"location":"manual/#","page":"Manual","title":"Manual","text":"Currently we deal manually with mixed states, as they are not implemented inside the library.","category":"page"},{"location":"#SimpleClifford.jl-1","page":"SimpleClifford.jl","title":"SimpleClifford.jl","text":"","category":"section"},{"location":"#","page":"SimpleClifford.jl","title":"SimpleClifford.jl","text":"A Julia package for working with quantum stabilizer states and Clifford circuits that act on them.","category":"page"},{"location":"API/#Full-API-(autogenerated)-1","page":"Full API (autogenerated)","title":"Full API (autogenerated)","text":"","category":"section"},{"location":"API/#","page":"Full API (autogenerated)","title":"Full API (autogenerated)","text":"Modules = [SimpleClifford]","category":"page"},{"location":"API/#SimpleClifford.SimpleClifford","page":"Full API (autogenerated)","title":"SimpleClifford.SimpleClifford","text":"A module for simulation of Clifford circuits.\n\n\n\n\n\n","category":"module"},{"location":"API/#SimpleClifford.CliffordOperator","page":"Full API (autogenerated)","title":"SimpleClifford.CliffordOperator","text":"Clifford Operator specified by the mapping of the basis generators.\n\njulia> CNOT\nX_ ⟼ + XX\n_X ⟼ + _X\nZ_ ⟼ + Z_\n_Z ⟼ + ZZ\n\njulia> phase_gate = C\"Y\n                      Z\"\nX ⟼ + Y\nZ ⟼ + Z\n\njulia> stab = S\"XI\n                IZ\";\n\njulia> entangled = CNOT*stab\n+ XX\n+ ZZ\n\n\n\n\n\n","category":"type"},{"location":"API/#SimpleClifford.PauliOperator","page":"Full API (autogenerated)","title":"SimpleClifford.PauliOperator","text":"A multi-qubit Pauli operator (1iIZXY^otimes n).\n\nA Pauli can be constructed with the P custom string macro or by building up one through products and tensor products of smaller operators.\n\njulia> pauli3 = P\"-iXYZ\"\n-iXYZ\n\njulia> pauli4 = 1im * pauli3 ⊗ X\n+ XYZX\n\njulia> Z*X\n+iY\n\nWe use a typical F(2,2) encoding internally. The X and Z bits are stored in a single concatenated padded array of UInt64 chunks of a bit array.\n\njulia> p = P\"-IZXY\";\n\njulia> p.xz\n2-element Array{UInt64,1}:\n 0x000000000000000c\n 0x000000000000000a\n\n\n\n\n\n","category":"type"},{"location":"API/#SimpleClifford.Stabilizer","page":"Full API (autogenerated)","title":"SimpleClifford.Stabilizer","text":"Stabilizer, i.e. a list of commuting multi-qubit Hermitian Pauli operators.\n\nInstances can be created with the S custom string macro or as direct sum of other stabilizers.\n\njulia> s = S\"XXX\n             ZZI\n             IZZ\"\n+ XXX\n+ ZZ_\n+ _ZZ\n\njulia> s⊕s\n+ XXX___\n+ ZZ____\n+ _ZZ___\n+ ___XXX\n+ ___ZZ_\n+ ____ZZ\n\nIt has an indexing API, looking like a list of PauliOperators.\n\njulia> s[2]\n+ ZZ_\n\nPauli operators can act directly on the a stabilizer.\n\njulia> P\"YYY\" * s\n- XXX\n+ ZZ_\n+ _ZZ\n\nThere are no automatic checks for correctness (i.e. independence of all rows, commutativity of all rows, hermiticity of all rows). The rank (number of rows) is permitted to be less than the number of qubits (number of columns): canonilization, projection, etc. continue working in that case.\n\nSee also: PauliOperator, canonicalize!\n\n\n\n\n\n","category":"type"},{"location":"API/#SimpleClifford.canonicalize!-Tuple{Stabilizer}","page":"Full API (autogenerated)","title":"SimpleClifford.canonicalize!","text":"Canonicalize a stabilizer (in place).\n\nAssumes the input is a valid stabilizer (all operators commute and have real phases). It permits redundant generators and identity generators.\n\njulia> ghz = S\"XXXX\n               ZZII\n               IZZI\n               IIZZ\";\n\njulia> canonicalize!(ghz)\n+ XXXX\n+ Z__Z\n+ _Z_Z\n+ __ZZ\n\njulia> canonicalize!(S\"XXXX\n                       IZZI\n                       IIZZ\")\n+ XXXX\n+ _Z_Z\n+ __ZZ\n\njulia> canonicalize!(S\"XXXX\n                       ZZII\n                       IZZI\n                       IZIZ\n                       IIZZ\")\n+ XXXX\n+ Z__Z\n+ _Z_Z\n+ __ZZ\n+ ____\n\nBased on arxiv:1210.6646. See arxiv:0505036 for other types of canonicalization.\n\n\n\n\n\n","category":"method"},{"location":"API/#SimpleClifford.comm-Tuple{PauliOperator,PauliOperator}","page":"Full API (autogenerated)","title":"SimpleClifford.comm","text":"Check whether two operators commute.\n\n0x0 if they commute, 0x1 if they anticommute.\n\njulia> P\"XX\"*P\"ZZ\", P\"ZZ\"*P\"XX\"\n(- YY, - YY)\n\njulia> comm(P\"ZZ\", P\"XX\")\n0x00\n\njulia> comm(P\"IZ\", P\"XX\")\n0x01\n\n\n\n\n\n","category":"method"},{"location":"API/#SimpleClifford.generate!-Tuple{PauliOperator,Stabilizer}","page":"Full API (autogenerated)","title":"SimpleClifford.generate!","text":"Generate a Pauli operator by using operators from a given the Stabilizer.\n\nIt assumes the stabilizer is already canonicalized. It modifies the Pauli operator in place. It assumes the operator can be generated up to a phase. That phase is left in the modified operator, which should be the identity up to a phase. Returns the new operator and the list of indices denoting the elements of stabilizer that were used for the generation.\n\njulia> ghz = S\"XXXX\n               ZZII\n               IZZI\n               IIZZ\";\n\njulia> canonicalize!(ghz)\n+ XXXX\n+ Z__Z\n+ _Z_Z\n+ __ZZ\n\njulia> generate!(P\"-ZIZI\", ghz)\n(- ____, [2, 4])\n\n\n\n\n\n","category":"method"},{"location":"API/#SimpleClifford.prodphase-Tuple{AbstractArray{UInt64,1},AbstractArray{UInt64,1}}","page":"Full API (autogenerated)","title":"SimpleClifford.prodphase","text":"Get the phase of the product of two Pauli operators.\n\nPhase is encoded as F(4) in the low qubits of an UInt8.\n\njulia> P\"ZZZ\"*P\"XXX\"\n-iYYY\n\njulia> prodphase(P\"ZZZ\", P\"XXX\")\n0x03\n\njulia> prodphase(P\"XXX\", P\"ZZZ\")\n0x01\n\n\n\n\n\n","category":"method"},{"location":"API/#SimpleClifford.project!-Tuple{Stabilizer,PauliOperator}","page":"Full API (autogenerated)","title":"SimpleClifford.project!","text":"Project the state of a Stabilizer on the two eigenspaces of a Pauli operator.\n\nAssumes the input is a valid stabilizer. The projection is done inplace on that stabilizer and it does not modify the projection operator.\n\nIt returns\n\na stabilizer that might not be in canonical form\nthe index of the row where the non-commuting operator was (that row is now equal to pauli; its phase is not updated and for a faithful measurement simulation it needs to be randomized by the user)\nand the result of the projection if there was no non-cummuting operator (nothing otherwise)\n\nIf keep_result==false that result of the projection in case of anticommutation is not computed, sparing a canonicalization operation.\n\nHere is an example of a projection destroing entanglement:\n\njulia> ghz = S\"XXXX\n               ZZII\n               IZZI\n               IIZZ\";\n\njulia> canonicalize!(ghz)\n+ XXXX\n+ Z__Z\n+ _Z_Z\n+ __ZZ\n\njulia> state, anticom_index, result = project!(ghz, P\"ZIII\");\n\njulia> state\n+ Z___\n+ Z__Z\n+ _Z_Z\n+ __ZZ\n\njulia> canonicalize!(state)\n+ Z___\n+ _Z__\n+ __Z_\n+ ___Z\n\njulia> anticom_index, result\n(1, nothing)\n\nAnd an example of projection consistent with the stabilizer state.\n\njulia> s = S\"ZII\n             IXI\n             IIY\";\n\njulia> canonicalize!(s)\n+ _X_\n+ __Y\n+ Z__\n\njulia> state, anticom_index, result = project!(s, P\"-ZII\");\n\njulia> state\n+ _X_\n+ __Y\n+ Z__\n\njulia> anticom_index, result\n(0, 0x02)\n\n\n\n\n\n","category":"method"}]
}